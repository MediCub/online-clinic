import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthContextProvider } from './contexts/AuthContext';
import { theme1 } from './themes/theme1';

ReactDOM.render(
  <AuthContextProvider>
    <ThemeProvider theme={theme1}>
      <App />
    </ThemeProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
