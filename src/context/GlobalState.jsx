import React, { createContext, useEffect, useReducer } from 'react';
import userReducer from './userReducer';
// Peticiones HTTP - BBDD
import clienteAxios from './../config/axios';

const initialState = {
  usuarios: [],
  usuario: { email: '', first_name: '', last_name: '', avatar: '' },
  loading: false,
  loadError: false,
};

export const GlobalContext = createContext(initialState);

const isSuccess = status => status >= 200 && status < 300;

export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Se carga una sola vez al montar la app (no en cada visita a Home): reqres.in es una API
  // simulada que no persiste realmente las altas/ediciones, así que volver a pedir la lista
  // tras crear/editar un usuario sobrescribiría el cambio optimista que se acaba de aplicar.
  useEffect(() => {
    obtenerUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function obtenerUsuarios() {
    dispatch({ type: 'LIST_USERS_START' });
    clienteAxios
      .get('/api/usuarios')
      .then(res => {
        dispatch({
          type: 'LIST_USERS',
          payload: res.data.data,
        });
      })
      .catch(e => {
        console.error(e.response ?? e);
        dispatch({ type: 'LIST_USERS_ERROR' });
      });
  }

  function addUsuario(usuario) {
    clienteAxios
      .post('/api/usuarios', usuario)
      .then(res => {
        if (isSuccess(res.status)) {
          dispatch({
            type: 'ADD_USER',
            payload: res.data,
          });
        }
      })
      .catch(e => {
        console.error(e.response ?? e);
      });
  }

  function editUsuario(usuario) {
    clienteAxios
      .put(`/api/usuarios/${usuario.id}`, usuario)
      .then(res => {
        if (isSuccess(res.status)) {
          dispatch({
            type: 'UPDATE_USER',
            payload: usuario,
          });
        }
      })
      .catch(e => {
        console.error(e.response ?? e);
      });
  }

  function deleteUsuario(id) {
    clienteAxios
      .delete(`/api/usuarios/${id}`)
      .then(res => {
        if (isSuccess(res.status)) {
          dispatch({
            type: 'REMOVE_USER',
            payload: id,
          });
        }
      })
      .catch(e => {
        console.error(e.response ?? e);
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        usuarios: state.usuarios,
        loading: state.loading,
        loadError: state.loadError,
        obtenerUsuarios,
        addUsuario,
        editUsuario,
        deleteUsuario,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
