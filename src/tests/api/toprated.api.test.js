import fetch from "node-fetch";

// Simulez fetch avec jest.fn() pour contrôler son comportement
jest.mock("node-fetch", () => jest.fn());

// Simulez ConfigService pour fournir des valeurs prévisibles pour les URLs et les tokens
jest.mock("../../../services/config.service", () => ({
  ConfigService: {
    themoviedb: {
      urls: {
        topRated: "https://api.themoviedb.org/3/topRated",
      },
      keys: {
        API_TOKEN:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWU4MDRiNTc4ZTk0N2I2NDM3MDk3NTNjNGZiN2I5ZCIsInN1YiI6IjY1ZTliODAzNWFiYTMyMDE4NjcwZjEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LXpL4w8P7XwhPjefLL7fkRbzCGm3VIt_TXbtuDcLfbk",
      },
    },
  },
}));

import handler from "../../../pages/api/movies/discover/toprated";

describe("/api/movies/discover/toprated API Endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return top rated movies data when fetch is successful", async () => {
    const mockResponseData = {
      results: [
        { id: 1, title: "Top Rated Movie 1" },
        { id: 2, title: "Top Rated Movie 2" },
      ],
    };

    // Simulez fetch pour qu'il retourne une réponse réussie contenant mockResponseData
    fetch.mockResolvedValueOnce({
      json: async () => mockResponseData,
    });

    const req = {}; // Objet de requête simulé
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Objet de réponse simulé

    await handler(req, res);

    // Ajoutez des logs pour déboguer le comportement de fetch et la réponse générée
    console.log("Fetch mock called with URL:", fetch.mock.calls[0][0]);
    console.log("Status code set to:", res.status.mock.calls);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: mockResponseData.results,
    });
  });

  it("should handle network errors gracefully", async () => {
    // Simulez fetch pour qu'il rejette avec une erreur de réseau
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await handler(req, res);

    // Logs pour déboguer en cas d'erreur réseau
    console.log("Fetch mock called and rejected with Network Error");
    console.log("Status code set to:", res.status.mock.calls);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      error: "Internal Server Error",
    });
  });
});
