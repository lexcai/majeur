import React from 'react';
import { Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import theme from '../../src/themes/themes';

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing(3),
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="body2">
          Copyright &copy; lexcai & Zephyor
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
