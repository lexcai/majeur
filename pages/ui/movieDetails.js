// pages/ui/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Box, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({ videos: [] });
  const router = useRouter();
  const { id } = router.query; // Utiliser l'ID du film passé dans l'URL

  useEffect(() => {
    if (id) {
      fetch(`/api/movies/${id}`)
        .then((response) => response.json())
        .then((data) => setMovieDetails(data.data))
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    }
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />

      <Container component="main" maxWidth="md"></Container>
    </ThemeProvider>
  );
}
