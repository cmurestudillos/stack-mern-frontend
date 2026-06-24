import React, { Fragment, useContext, useState, useEffect } from 'react';
import { GlobalContext } from './../../context/GlobalState';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
// Peticiones HTTP - BBDD
import clienteAxios from './../../config/axios';
import { useAppToast } from '../../context/ToastContext';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { editUsuario } = useContext(GlobalContext);
  const currentUserId = useParams();
  const showToast = useAppToast();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const usuarioId = parseInt(currentUserId.id, 10);
    clienteAxios
      .get(`/api/usuarios/${usuarioId}`)
      .then(res => {
        setSelectedUser(res.data.data);
      })
      .catch(e => {
        console.error(e.response ?? e);
        setLoadError(true);
      });
  }, [currentUserId]);

  const handleOnChange = (userKey, newValue) => setSelectedUser({ ...selectedUser, [userKey]: newValue });

  if (loadError) {
    return <div>ID usuario incorrecto.</div>;
  }

  if (!selectedUser) {
    return <div>Cargando...</div>;
  }

  const onSubmit = event => {
    event.preventDefault();

    confirmDialog({
      header: 'Confirmar',
      message: '¿Desea modificar el usuario?',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        editUsuario(selectedUser);
        navigate('/');
        showToast({ severity: 'success', summary: 'Usuario modificado con éxito.', life: 1500 });
      },
    });
  };

  return (
    <Fragment>
      <Card className="form-card" title="Modificar usuario">
        <form onSubmit={onSubmit} className="app-form">
          <FloatLabel variant="on" className="field">
            <InputText
              id="email"
              type="email"
              className="w-full"
              value={selectedUser.email}
              onChange={e => handleOnChange('email', e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>

          <FloatLabel variant="on" className="field">
            <InputText
              id="first_name"
              className="w-full"
              value={selectedUser.first_name}
              onChange={e => handleOnChange('first_name', e.target.value)}
            />
            <label htmlFor="first_name">First Name</label>
          </FloatLabel>

          <FloatLabel variant="on" className="field">
            <InputText
              id="last_name"
              className="w-full"
              value={selectedUser.last_name}
              onChange={e => handleOnChange('last_name', e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
          </FloatLabel>

          <div className="form-actions">
            <Button type="submit" label="Confirmar" />
            <Button type="button" label="Cancelar" severity="secondary" outlined onClick={() => navigate('/')} />
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default EditarUsuario;
