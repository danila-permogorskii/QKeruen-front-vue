import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth';
import User from './modules/user';
import Driver from './modules/driver';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: Auth,
    user: User,
    driver: Driver,
  },
})
