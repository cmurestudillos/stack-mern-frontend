import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog';
import avatar from '../assets/img/avatar.png';
import { getAvatarUrl } from '../config/axios';
import { useAppToast } from '../context/ToastContext';

const ListadoUsuarios = () => {
  const { usuarios, loading, loadError, obtenerUsuarios, deleteUsuario } = useContext(GlobalContext);
  const navigate = useNavigate();
  const showToast = useAppToast();

  const eliminarUsuario = id => {
    confirmDialog({
      header: 'Confirmar',
      message: '¿Esta seguro de eliminar al usuario?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        deleteUsuario(id);
        showToast({ severity: 'success', summary: 'Usuario eliminado con éxito.', life: 1500 });
      },
    });
  };

  if (loading) {
    return (
      <div className="state-container">
        <ProgressSpinner strokeWidth="4" />
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="state-container">
        <Message
          severity="error"
          text="No se ha podido cargar el listado de usuarios. Comprueba tu conexión a internet o que la API esté disponible."
        />
        <Button label="Reintentar" icon="pi pi-refresh" onClick={obtenerUsuarios} />
      </div>
    );
  }

  if (!usuarios || usuarios.length === 0) {
    return (
      <div className="state-container">
        <Message severity="info" text="No hay usuarios para mostrar." />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="user-grid">
        {usuarios.map(user => (
          <Card key={user.id} className="user-card">
            <div className="user-card-body">
              <Avatar image={user.avatar ? getAvatarUrl(user.avatar) : avatar} size="xlarge" shape="circle" />
              <div className="user-info">
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="user-actions">
              <Button
                label="Editar"
                icon="pi pi-pencil"
                severity="warning"
                onClick={() => navigate(`/editar/${user.id}`)}
              />
              <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={() => eliminarUsuario(user.id)} />
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default ListadoUsuarios;
