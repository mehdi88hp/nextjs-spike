import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Shadows } from '@mui/material/styles/shadows';

export const theme = createTheme({
  direction: 'rtl',
  shadows: Array(25).fill("none") as Shadows,

  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});