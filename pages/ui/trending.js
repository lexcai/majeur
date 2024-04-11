import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal } from '@mui/material';

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
            padding: '1px',
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

function TrendingPage({ title, fetchPath }) { // 'title' and 'fetchPath' are props to be passed to the component
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);
const [open, setOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const handleOpenModal = (movieId) => {
    setIsLoading(true);
    fetch(`/api/movies/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
        setSelectedMovie(data.data);
        setOpen(true);
    })
    .catch((error) => console.error('Error fetching movie details:', error))
    .finally(() => setIsLoading(false));
};

const handleCloseModal = () => {
    setOpen(false);
};

useEffect(() => {
    fetch('/api/movies')
    .then((response) => response.json())
    .then((data) => setMovies(data.data))
    .catch((error) =>
        console.error('Error fetching trending movies:', error)
    );
}, []);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'rgba(0, 0, 0, 1)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
};

return (
    <ThemeProvider theme={theme}>
    <Container component='main' maxWidth='95%' sx={{ pt: '64px', px:'0px '}}>
        <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
            Trending Movies
        </Typography>
        </Box>
        <Grid container spacing={4
        }>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={2.4} lg={2.4}>
              <Card onClick={() => handleOpenModal(movie.id)}>
                <CardMedia
                  component='img'
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ height: '350px', objectFit: 'cover' }}
                />
                <CardContent sx={{px:2}}>
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
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby='movie-details-title'
            aria-describedby='movie-details-description'
          >
            <Box sx={style}>
              {selectedMovie && (
                <>
                  <Typography
                    id='movie-details-title'
                    variant='h4'
                    gutterBottom
                    component='div'
                  >
                    {selectedMovie.title} (
                    {new Date(selectedMovie.release_date).getFullYear()})
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <CardMedia
                      component='img'
                      sx={{
                        width: 'auto',
                        maxHeight: '400px',
                        borderRadius: '4px',
                      }}
                      image={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
                      alt={selectedMovie.title}
                    />
                  </Box>
                  <Typography variant='body1' gutterBottom>
                    {selectedMovie.overview}
                  </Typography>
                  {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        marginBottom: 2,
                      }}
                    >
                      {selectedMovie.genres.map((genre) => (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          variant='outlined'
                          color='primary'
                        />
                      ))}
                    </Box>
                  )}
                  <Typography variant='body2' gutterBottom>
                    <strong>Runtime:</strong> {selectedMovie.runtime} minutes
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Release Date:</strong> {selectedMovie.release_date}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    <strong>Rating:</strong> {selectedMovie.vote_average} / 10 (
                    {selectedMovie.vote_count} votes)
                  </Typography>
                  {selectedMovie.tagline && (
                    <Typography variant='body2' gutterBottom>
                      <em>{selectedMovie.tagline}</em>
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Modal>
        )}
    </Container>
    </ThemeProvider>
);
}

export default TrendingPage;
