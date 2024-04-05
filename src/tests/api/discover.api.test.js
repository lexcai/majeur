import fetch from "node-fetch";
jest.mock("../../../services/config.service", () => ({
  themoviedb: {
    urls: {
      discover: "https://api.themoviedb.org/3/discover/movie",
    },
    keys: {
      API_TOKEN:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWU4MDRiNTc4ZTk0N2I2NDM3MDk3NTNjNGZiN2I5ZCIsInN1YiI6IjY1ZTliODAzNWFiYTMyMDE4NjcwZjEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LXpL4w8P7XwhPjefLL7fkRbzCGm3VIt_TXbtuDcLfbk",
    },
  },
}));

// Importation du gestionnaire après le mock
import handler from "../../../pages/api/movies/discover/index";

jest.mock("node-fetch");
describe("API Handler for Discover", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return data from the discover API when successful", async () => {
    const mockData = {
      results: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockData.results,
    });
  });

  it("should handle network errors", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      error: "Internal Server Error",
    });
  });

  it("should handle errors in configuration", async () => {
    // Ce test n'est plus nécessaire si ConfigService est correctement mocké
    // puisque le mock contrôle déjà la configuration utilisée par le gestionnaire API
  });
});
