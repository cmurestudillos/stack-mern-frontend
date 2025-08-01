import React, { Fragment, useContext, useState, useEffect } from 'react';
import { GlobalContext } from './../../context/GlobalState';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// Peticiones HTTP - BBDD
import clienteAxios from './../../config/axios';

const EditarUsuario = () => {
  let navigate = useNavigate();
  const { editUsuario } = useContext(GlobalContext);
  const currentUserId = useParams();
  const [selectedUser, setSelectedUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  useEffect(() => {
    const usuarioId = parseInt(currentUserId.id);
    clienteAxios
      .get(`/api/usuarios/${usuarioId}`)
      .then(res => {
        setSelectedUser(res.data.data);
      })
      .catch(e => {
        console.log(e.response);
      });
  }, [currentUserId]);

  const handleOnChange = (userKey, newValue) => setSelectedUser({ ...selectedUser, [userKey]: newValue });

  if (!selectedUser || !selectedUser.id) {
    return <div>ID usuario incorrecto.</div>;
  }

  const onSubmit = event => {
    event.preventDefault();

    Swal.fire({
      title: 'Desea modificar el usuario?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#198757',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#db3448',
    }).then(result => {
      if (result.isConfirmed) {
        editUsuario(selectedUser);
        navigate('/');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario modificado con exito.',
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
              value={selectedUser.email}
              onChange={e => handleOnChange('email', e.target.value)}
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
              value={selectedUser.first_name}
              onChange={e => handleOnChange('first_name', e.target.value)}
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
              value={selectedUser.last_name}
              onChange={e => handleOnChange('last_name', e.target.value)}
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

export default EditarUsuario;
