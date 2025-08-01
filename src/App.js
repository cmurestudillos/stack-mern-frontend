import React, { Fragment } from 'react';
// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
// Rutas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Provider
import { GlobalProvider } from './context/GlobalState';
import Home from './components/Home';
import CrearUsuario from './components/actions/CrearUsuario';
import EditarUsuario from './components/actions/EditarUsuario';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
  return (
    <Fragment>
      <Router>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/crear" element={<CrearUsuario />}></Route>
            <Route path="/editar/:id" element={<EditarUsuario />}></Route>
          </Routes>
          <Footer />
        </GlobalProvider>
      </Router>
    </Fragment>
  );
}

export default App;
