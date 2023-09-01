<template>
  <div id="app">
    <StartWindow
      v-if="!showStartWindow"
      class="app__start-window"
      :class="{'app__start-window_hidden': showContent}"
    />
    <div
      :class="{ 'app__install-btns_show': showInstallBtns }"
      class="app__install-btns"
    >
      <div class="app__install-btns-content">
        <div class="app__install-btns-header">
          <CrossIcon class="app__cross-icon" @click="closeBtns" />
        </div>
        <div class="app__install-btns-title">
          Для большего удобства вы можете добавить приложение на ваш рабочий экран
        </div>
        <template v-if="isMobile && isIOS && BrowserName === 'Safari'">
          <div class="app__install-btns-title">
            Нажмите на иконку <span><BackupIcon class="app__install-btn-icon" /></span> и в меню выберите «На экран домой»
          </div>

          <VButton
            small
            class="app__apple-btn-close"
            @click.native="unshowBtns"
          >
            Отказаться
          </VButton>
        </template>
        <template v-else-if="isMobile && !isIOS && BrowserName === 'Google Chrome'">
          <div class="app__install-btns-title">
            Нажмите на иконку <span><DotsThreeIcon class="app__install-btn-icon" /></span> и в меню выберите «Добавить на гл.экран»
          </div>

          <VButton
            small
            class="app__apple-btn-close"
            @click.native="unshowBtns"
          >
            Отказаться
          </VButton>
        </template>
        <template v-else-if="isMobile && !isIOS && BrowserName === 'YaBrowser'">
          <div class="app__install-btns-title">
            Нажмите на иконку <span><BurgerIcon class="app__install-btn-icon" /></span> и в меню выберите «Добавить ярлык на телефон»
          </div>

          <VButton
            small
            class="app__apple-btn-close"
            @click.native="unshowBtns"
          >
            Отказаться
          </VButton>
        </template>
        <template v-else-if="isMobile && isIOS && BrowserName === 'CriOS'">
          <div class="app__install-btns-title">
            Данное решение для вас возможно в браузере Safari
          </div>

          <VButton
            small
            class="app__apple-btn-close"
            @click.native="unshowBtns"
          >
            Отказаться
          </VButton>
        </template>

        <div v-else class="app__install-btns-items">
          <VButton
            small
            variant="yellow"
            class="app__install-btns-item"
            @click.native="installApplication"
          >
            Посмотреть
          </VButton>
          <VButton
            small
            class="app__install-btns-item"
            @click.native="unshowBtns"
          >
            Отказаться
          </VButton>
        </div>
      </div>
    </div>
    <router-view v-if="showContent" />

    <notifications />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import StartWindow from '@/components/StartWindow.vue';
import VButton from '@/components/ui/VButton.vue';
import CrossIcon from '@/assets/icons/cross.svg';
import BackupIcon from '@/assets/icons/backup.svg';
import DotsThreeIcon from '@/assets/icons/dots_three.svg';
import BurgerIcon from '@/assets/icons/burger.svg';

export default {
  name: 'App',
  components: {
    StartWindow,
    VButton,
    CrossIcon,
    BackupIcon,
    DotsThreeIcon,
    BurgerIcon,
  },

  data: () => ({
    showContent: false,
    showStartWindow: false,
    deferredPrompt: null,
    isInstalled: false,
    showInstallBtns: false,
    installEvent: null,
    OSName: null,
    BrowserName: null,
    isMobile: false,
    isIOS: false,
  }),

  computed: {
    ...mapState('auth', [
      'authorize',
    ]),
  },

  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome >=67 from automatically showing the prompt:
      e.preventDefault();

      // Stash the event so it can be triggered later:
      this.installEvent = e;
      console.log(this.installEvent);
    });
  },

  mounted() {
    this.browserDetect();
    this.detectIOS();
    this.detectMobile();
    setTimeout(() => {
      this.showContent = true;
    }, 2222)
    setTimeout(() => {
      this.showStartWindow = true;
      if (this.$route.path !== '/download-instructions') {
        this.pwaInit();
      }
    }, 2500)
  },

  methods: {
    pwaInit() {
      this.isInstalled = localStorage.getItem('pwaInstalledItem') === '1' || false;
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        // User is currently navigating on the PWA so yes it's installed
        localStorage.setItem('pwaInstalledItem', '1');
        this.isInstalled = true;
      } else {
        window.addEventListener('beforeinstallprompt', (e) => {
          localStorage.setItem('pwaInstalledItem', '0');
          this.isInstalled = false;
        });
        window.addEventListener('onappinstalled', () => {
          localStorage.setItem('pwaInstalledItem', '1');
          this.isInstalled = true;
        });
      }

      let unshowBtns = localStorage.getItem('unshowBtns') === '1';
      if (!unshowBtns && !this.isInstalled) {
        this.showInstallBtns = true;
      }
    },
    closeBtns() {
      this.showInstallBtns = false;
    },
    unshowBtns() {
      let expire = new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0);
      localStorage.setItem('unshowBtns', '1', expire);
      this.showInstallBtns = false;
    },
    installPwa() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        // this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          console.log('yeah');
          // Do something additional if the user chose to install
        } else {
          console.log('oh, noo');
          // Do something additional if the user declined
        }
      })
    },
    installApplication() {
      if (this.installEvent) {
        this.installPwa();
        return;
      }
      else {
        this.closeBtns();
        this.$router.push('/download-instructions');
      }
    },
    browserDetect() {
      const isCriOS = navigator.userAgent.match('CriOS');
      if (isCriOS) {
        this.BrowserName = 'CriOS';
        return;
      }
      const isYandex = /YaBrowser/.test(navigator.userAgent);
      if (isYandex) {
        this.BrowserName = 'YaBrowser';
        return;
      }
      const isChrome = /Chrome/.test(navigator.userAgent);
      if (isChrome) {
        this.BrowserName = 'Google Chrome';
        return;
      }
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        this.BrowserName = 'Safari';
        return;
      }

      if (navigator.userAgentData && navigator.userAgentData.length) {
        if (navigator.userAgentData?.brands?.find((item) => item.brand === 'Google Chrome')) this.BrowserName = 'Google Chrome';
        if (navigator.userAgentData?.brands?.find((item) => item.brand === 'YaBrowser')) this.BrowserName = 'YaBrowser';
      }
    },
    detectIOS() {
      this.isIOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    },
    detectMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true;
      }
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: 'Roboto';
}

.app {
  position: relative;

  &__start-window {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    transition: .3s;
    z-index: 9999999;

    &_hidden {
      transform: translate(-100%, 0);
      opacity: 0;
    }
  }

  &__install-btns {
    position: fixed;
    max-width: 660px;
    padding: 25px;
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100vh;
    z-index: 1999999;
    background-color: rgb(0 0 0 / 50%);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: .3s;

    @media (max-width: 350px) {
      padding: 15px;
    }

    &_show {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
  }

  &__install-btns-content {
    padding: 15px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 15px -1px rgba(82, 82, 82, 0.1019607843);
    @media (max-width: 350px) {
      padding: 15px;
    }
  }

  &__install-btns-title {
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 500;
    line-height: 14px;
    color: #202020;
  }


  &__install-btns-items {
    display: flex;
    align-items: center;
  }

  &__install-btns-item {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  &__install-btns-header {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
  }

  &__cross-icon {
    width: 17px;
  }

  &__apple-btn-close {
    margin-left: auto;
  }

  &__install-btn-icon {
    width: 13px;
    transform: translate(0, 3px);
  }
}

.add-button {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
