import React, { Fragment, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GlobalContext } from './../../context/GlobalState';
import Swal from 'sweetalert2';

const CrearUsuario = () => {
  let navigate = useNavigate();
  const { addUsuario } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setlastname] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    Swal.fire({
      title: '¿Generar nuevo registro?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#198757',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#db3448',
    }).then(result => {
      if (result.isConfirmed) {
        const nuevoUsuario = { email, first_name, last_name, avatar: '' };
        addUsuario(nuevoUsuario);
        navigate('/');

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario creado con exito.',
          showConfirmButton: false,
          timer: 500,
        });
      }
    });
  };

  return (
    <Fragment>
      <div className="container m-container shadow-lg p-3 mb-5 bg-body rounded">
        <form onSubmit={onSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="email">
              email@
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              First name
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstname"
              value={first_name}
              onChange={e => setFirstname(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Last name
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastname"
              value={last_name}
              onChange={e => setlastname(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="btn btn-outline-success me-md-2" type="submit">
              Confirmar
            </button>
            <Link to={'/'} className="btn btn-outline-danger" type="button">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CrearUsuario;
