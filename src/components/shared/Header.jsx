import React, { Fragment } from 'react';
import logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-custom fixed-top">
        <div className="container-fluid">
          <img src={logo} alt="" width="64" height="64"></img>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeclassname="active">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/crear" className="nav-link" activeclassname="active">
                  Añadir
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
