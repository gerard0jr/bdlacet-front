import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: {
          main: '#355C57',
        },
      },
    });
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Routes/>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
