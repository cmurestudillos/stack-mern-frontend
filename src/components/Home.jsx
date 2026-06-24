import React, { Fragment } from 'react';
import ListadoUsuarios from './ListadoUsuarios';

const Home = () => {
  return (
    <Fragment>
      <h1 className="page-title">Usuarios</h1>
      <ListadoUsuarios />
    </Fragment>
  );
};

export default Home;
