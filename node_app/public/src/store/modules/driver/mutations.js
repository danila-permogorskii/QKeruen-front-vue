export default {
  SAVE_DRIVER_INFO(state, driverInfo) {
    state.driverInfo = driverInfo;
  },
  CLEAR_DRIVER(state) {
    state.driverInfo = null;
  },
}