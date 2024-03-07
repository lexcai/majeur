// pages/api/movies/[idMovie].js
export default async function handler(req, res) {
  const idMovie = parseInt(req.query.idMovie, 10);
  const movies = [
    { _id: 1, title: "The Batman" },
    { _id: 2, title: "The Joker" },
  ];
  const movie = movies.find(({ _id }) => _id === idMovie);
  res.json({ status: 200, data: { movie: movie || "not found" } });
}
