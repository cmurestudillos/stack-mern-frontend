import React, { Fragment } from 'react';
// Estilos
import { PrimeReactProvider } from 'primereact/api';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// Rutas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Providers
import { GlobalProvider } from './context/GlobalState';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Home from './components/Home';
import CrearUsuario from './components/actions/CrearUsuario';
import EditarUsuario from './components/actions/EditarUsuario';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
  return (
    <Fragment>
      <PrimeReactProvider>
        <ThemeProvider>
          <ToastProvider>
            <ConfirmDialog />
            <Router>
              <GlobalProvider>
                <div className="app-shell">
                  <Header />
                  <main className="app-content">
                    <Routes>
                      <Route path="/" element={<Home />}></Route>
                      <Route path="/crear" element={<CrearUsuario />}></Route>
                      <Route path="/editar/:id" element={<EditarUsuario />}></Route>
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </GlobalProvider>
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </PrimeReactProvider>
    </Fragment>
  );
}

export default App;
