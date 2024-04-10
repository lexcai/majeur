import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Assuming you have other font-related setup, ensure that the font is properly loaded.

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'dark', // Enables dark mode in Material-UI
    primary: {
      main: '#e50914', // Netflix red
    },
    secondary: {
      main: '#ffffff', // White for secondary buttons and text
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#141414', // Dark background, similar to Netflix's
      paper: '#1f1f1f', // Slightly lighter for paper elements
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)', // Slightly muted white for less emphasis
    },
  },
  typography: {
    // Your existing typography configurations
    fontFamily: 'Roboto, Arial, sans-serif', // Assuming Roboto is already loaded
    // You can add more customization here as needed
  },
  // You can also customize components' default styles using this section
  components: {
    MuiButton: {
      styleOverrides: {
        // This will apply to all instances of MUI Button
        root: {
          color: 'white', // Buttons will default to white text
          textTransform: 'none', // If you want to remove uppercase styling
        },
      },
    },
    // ... other component overrides
  },
});

export default theme;
