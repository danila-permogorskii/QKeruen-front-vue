import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import YmapPlugin from 'vue-yandex-maps'

import VueMask from 'v-mask';

import './registerServiceWorker'
import router from './router'
import store from './store'

import { createApi } from '@/helpers/api';
import { checkToken } from '@/api/auth';
import { getUserProfile } from '@/api/user';
import { getDriverProfile } from '@/api/driver';
import '@/assets/styles/index.scss';
import '@/assets/fonts/roboto/roboto.css';

const settings = {
  apiKey: '8a3e4da0-9ef2-4176-9203-e7014c1dba6f',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

console.log(YmapPlugin);

Vue.use(YmapPlugin, settings)
Vue.use(VueMask);
Vue.config.productionTip = false
Vue.use(Notifications)

import { mapMutations } from 'vuex'

new Vue({
  router,
  store,
  async created() {
    const token = localStorage.getItem('keruen-auth-token')
      || sessionStorage.getItem('keruen-auth-token')
      || new URLSearchParams(window.location.search)?.get('keruen-auth-token');
    createApi(token);

    try {
      const response = await checkToken();

      if (response && response.data) {
        const {data} = response;
        this.LOGIN({
          token: data.Token,
          role: data.type,
          authorize: true,
        });

        if (data.type === 'user') {
          const { data: userData } = await getUserProfile();
          this.SAVE_USER_INFO(userData);
          if (this.$route.name === 'home') {
            this.$router.push('/user-main')
          }
        }
        if (data.type === 'driver') {
          const { data: driverData } = await getDriverProfile();
          this.SAVE_DRIVER_INFO(driverData);
          if (this.$route.name === 'home') {
            this.$router.push('/driver-profile')
          }
        }

      } else {
        this.LOGOUT();
        if (this.$route.path !== '/login') {
          this.$router.replace('/login');
        }
        // !!!
      }
    } catch(e) {
      this.LOGOUT();
      if (this.$route.path !== '/login') {
        this.$router.replace('/login');
      }
      console.error(e);
    }
  },

  methods: {
    ...mapMutations('auth', [
      'LOGOUT',
      'LOGIN',
      'IS_AUTHORIZE',
    ]),
    ...mapMutations('user', [
      'SAVE_USER_INFO',
    ]),
    ...mapMutations('driver', [
      'SAVE_DRIVER_INFO',
    ]),
  },
  render: h => h(App)
}).$mount('#app')
