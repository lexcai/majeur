// pages/ui/landing.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimarySearchAppBar from "../../src/themes/mui-base-components/Header";
import Link from "next/link";

const theme = createTheme();

function Landing() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies/discover/toprated")
      .then((response) => response.json())
      .then((data) => setTopRatedMovies(data.data))
      .catch((error) =>
        console.error("Error fetching top rated movies:", error)
      );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />

      <Container component="main" maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Top Rated Movies
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {topRatedMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Date: {movie.release_date}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Rating: {movie.vote_average} / 10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.overview.length > 150
                      ? movie.overview.substring(0, 147) + "..."
                      : movie.overview}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/ui/MovieDetails?id=${movie.id}`}>
                    Learn More
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Landing;
