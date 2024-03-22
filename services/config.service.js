export const ConfigService = {
  themoviedb: {
    urls: {
      discover: "https://api.themoviedb.org/3/discover/movie",
      movie: "https://api.themoviedb.org/3/movie",
      search: "https://api.themoviedb.org/3/search",
      topRated:
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", // pense a faire le changement de langue au niveau des parametres = pagination
      trending: "https://api.themoviedb.org/3/trending/all/day?language=fr-FR", // pense a faire le changement de langue au niveau des parametres
    },
    keys: {
      API_TOKEN:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWU4MDRiNTc4ZTk0N2I2NDM3MDk3NTNjNGZiN2I5ZCIsInN1YiI6IjY1ZTliODAzNWFiYTMyMDE4NjcwZjEzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LXpL4w8P7XwhPjefLL7fkRbzCGm3VIt_TXbtuDcLfbk",
      API_KEY: "11e804b578e947b643709753c4fb7b9d",
    },
  },
};
