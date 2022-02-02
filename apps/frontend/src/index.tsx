import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer, NavigationBar } from './components';
import { GlobalStyle } from './components/global';
import { AuthProvider } from './contexts/Auth';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes />
        <Footer />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
