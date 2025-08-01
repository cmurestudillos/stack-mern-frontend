import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import Swal from 'sweetalert2';

const ListadoUsuarios = () => {
  const { usuarios, deleteUsuario } = useContext(GlobalContext);

  const eliminarUsuario = id => {
    Swal.fire({
      title: 'Esta seguro de eliminar al usuario?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#198757',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#db3448',
    }).then(result => {
      if (result.isConfirmed) {
        deleteUsuario(id);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado con exito.',
          showConfirmButton: false,
          timer: 500,
        });
      }
    });
  };

  return (
    <Fragment>
      {usuarios !== undefined &&
        usuarios.map(user => (
          <div className="card mb-3" key={user.id}>
            <div className="row g-0">
              <div className="col-md-4 text-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="img-fluid rounded-circle shadow p-3 mb-3 mt-3 bg-body rounded"
                    alt={user.first_name}></img>
                ) : (
                  <img
                    src={avatar}
                    className="img-fluid rounded-circle shadow p-3 mb-3 mt-3 bg-body rounded"
                    alt={user.first_name}></img>
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {user.first_name} {user.last_name}
                  </h5>
                  <p className="card-text">{user.email}</p>
                  <div className="card-text">
                    <div className="d-grid gap-2 d-md-block">
                      <Link to={'/editar/' + user.id} className="btn btn-outline-warning btn-lg w-25 m-1" type="button">
                        Editar
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-lg w-25 m-1"
                        type="button"
                        onClick={() => eliminarUsuario(user.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default ListadoUsuarios;
