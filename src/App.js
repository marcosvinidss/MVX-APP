import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';

import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import "./App.css";

import Routes from './Routes';

// Criamos um componente interno que usa useLocation()
const Layout = () => {
  const location = useLocation();

  // Verifica se a rota começa com /admin
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!isAdminPage && <Header />}

      <main style={{ flex: 1 }}>
        <Routes />
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
};

const Page = (props) => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Page);
