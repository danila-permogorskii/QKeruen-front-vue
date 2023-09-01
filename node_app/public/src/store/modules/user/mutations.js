export default {
  SAVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR_USER(state) {
    state.userInfo = null;
  }
}