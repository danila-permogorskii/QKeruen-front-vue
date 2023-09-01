import { createApi } from '@/helpers/api';

export default {
  LOGIN(state, {
    role,
    token,
    authorize,
  }) {
    if (token) {
      token ? localStorage.setItem('keruen-auth-token', token) : null;
      createApi(token);
    }
    if (authorize) {
      state.authorize = true;
    }
    state.role = role;
  },

  LOGOUT(state) {
    localStorage.removeItem('keruen-auth-token');
    state.authorize = false;
  },

  IS_AUTHORIZE(state) {
    state.authorize = true;
  },

  AUTH_USER_INFO_SAVE(state, {phoneNumber, role}) {
    state.phoneNumber = phoneNumber;
    state.role = role;
  },
}