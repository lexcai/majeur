// pages/ui/landing.js
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

const theme = createTheme({
  components: {
    // Customizing all Cards to have a Netflix-like hover effect
    MuiCard: {
      styleOverrides: {
        root: (theme) => ({
          // Use a function to access the theme
          position: 'relative',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            '& .MuiCardContent-root': {
              opacity: 1,
              color: 'white',
            },
            '& .MuiCardActions-root': {
              opacity: 1,
            },
          },
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          opacity: 0,
          padding: '16px',
          transition: 'opacity 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: 'white',
        },
      },
    },
  },
});

function Landing() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies/discover/toprated')
      .then((response) => response.json())
      .then((data) => setTopRatedMovies(data.data))
      .catch((error) =>
        console.error('Error fetching top rated movies:', error)
      );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='lg' sx={{ pt: '64px' }}>
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Top Rated Movies
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {topRatedMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3} lg={3}>
              <Card>
                <CardMedia
                  component='img'
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ height: '450px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {movie.title}
                  </Typography>
                  <Typography variant='body2'>
                    Release Date: {movie.release_date}
                  </Typography>
                  <Typography variant='body2'>
                    Rating: {movie.vote_average} / 10
                  </Typography>
                  <Typography variant='body2'>
                    {movie.overview.length > 150
                      ? movie.overview.substring(0, 147) + '...'
                      : movie.overview}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Landing;
