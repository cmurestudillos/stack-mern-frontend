import React, { Fragment, useEffect, useContext } from 'react';
import ListadoUsuarios from './ListadoUsuarios';
import { GlobalContext } from './../context/GlobalState';

const Home = () => {
  const { obtenerUsuarios } = useContext(GlobalContext);
  // Obtener usuarios cuando carga el proyecto
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <Fragment>
      <div className="container m-container">
        <ListadoUsuarios />
      </div>
    </Fragment>
  );
};

export default Home;
