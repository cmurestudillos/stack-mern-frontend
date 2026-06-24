export default function userReducer(state, action) {
  switch (action.type) {
    case 'LIST_USERS_START':
      return {
        ...state,
        loading: true,
        loadError: false,
      };

    case 'LIST_USERS':
      return {
        ...state,
        usuarios: action.payload,
        loading: false,
        loadError: false,
      };

    case 'LIST_USERS_ERROR':
      return {
        ...state,
        loading: false,
        loadError: true,
      };

    case 'ADD_USER':
      return {
        ...state,
        usuarios: [...state.usuarios, action.payload],
      };

    case 'UPDATE_USER': {
      const updatedUsuario = action.payload;
      const updatedUsuarios = state.usuarios.map(usuario => {
        if (usuario.id === updatedUsuario.id) {
          return updatedUsuario;
        }
        return usuario;
      });

      return {
        ...state,
        usuarios: updatedUsuarios,
      };
    }

    case 'REMOVE_USER':
      return {
        ...state,
        usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload),
      };

    default:
      return state;
  }
}
