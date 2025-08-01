import React, { Component } from 'react';
// Rutas
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Componentes
import Header from './../components/shared/Header';
import Footer from './../components/shared/Footer';
import Home from './../components/Home';
import CrearUsuario from './../components/actions/CrearUsuario';
import EditarUsuario from './../components/actions/EditarUsuario';
// Provider
import { GlobalProvider } from '../context/GlobalState';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <GlobalProvider>
          <Header />
          {/* Configuracion de rutas y paginas */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/crear" element={<CrearUsuario />} />
            <Route exact path="/editar/:id" element={<EditarUsuario />} />
          </Routes>
          {/* Footer */}
          <Footer />
        </GlobalProvider>
      </BrowserRouter>
    );
  }
}

export default Router;
