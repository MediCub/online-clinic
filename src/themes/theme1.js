import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, red, yellow } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';

export const theme1 = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: {
      main: '#164160',
      light: '#476c8e',
      dark: '#001b36',
    },
    secondary: {
      main: red['500'],
    },
    accent: grey,
    error: red,
    success: green,
    inProgress: yellow,
  }),
});
