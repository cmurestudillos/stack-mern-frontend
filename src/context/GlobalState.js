import React, { createContext, useReducer } from 'react';
import userReducer from './userReducer';
// Peticiones HTTP - BBDD
import clienteAxios from './../config/axios';

const initialState = {
  usuarios: [],
  usuario: { email: '', first_name: '', last_name: '', avatar: '' },
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function obtenerUsuarios() {
    clienteAxios
      .get('/api/usuarios')
      .then(res => {
        state.usuarios = res.data.data;
        dispatch({
          type: 'LIST_USERS',
          payload: state.usuarios,
        });
      })
      .catch(e => {
        console.log(e.response);
      });
  }

  function addUsuario(usuario) {
    clienteAxios
      .post(`/api/usuarios`, usuario)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'ADD_USER',
            payload: res.data,
          });
        }
      })
      .catch(e => {
        console.log(e.response);
      });
  }

  function editUsuario(usuario) {
    clienteAxios
      .put(`/api/usuarios/${usuario.id}`, usuario)
      .then(res => {
        if (res.status === 200) {
          state.usuarios = state.usuarios.map(item => (item.id === usuario.id ? usuario : item));
          dispatch({
            type: 'UPDATE_USER',
            payload: usuario,
          });
        }
      })
      .catch(e => {
        console.log(e.response);
      });
  }

  function deleteUsuario(id) {
    clienteAxios
      .delete(`/api/usuarios/${id}`)
      .then(res => {
        if (res.status === 200) {
          state.usuarios = state.usuarios.filter(item => item.id !== id);

          dispatch({
            type: 'REMOVE_USER',
            payload: id,
          });
        }
      })
      .catch(e => {
        console.log(e.response);
      });
  }

  return (
    <GlobalContext.Provider
      value={{ usuarios: state.usuarios, obtenerUsuarios, addUsuario, editUsuario, deleteUsuario }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
