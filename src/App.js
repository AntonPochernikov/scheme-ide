import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Wrapper from './Wrapper';

const customTheme = createMuiTheme({});

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Wrapper />
    </ThemeProvider>
  );
}
