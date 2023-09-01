<template>
  <div class="login-view">
    <div class="bcg-img-conainer">
      <img
        src="@/assets/images/bcg.png"
        alt="#"
        class="bcg-img"
      />
    </div>
    <div class="container">

      <vue-bottom-sheet
        :max-width="maxWidth"
        :max-height="maxHeight"
        :overlay="overlay"
        :click-to-close="clickToClose"
        :showPan="showPan"
        :swipeAble="swipeAble"
        :isFullScreen="isFullScreen"
        :backgroundScrollable="backgroundScrollable"
        :backgroundClickable="backgroundClickable"
        ref="myBottomSheet"
      >
        <div class="login-view__sheet-content">
          <div>
            <div class="title-big">
              Регистрация
            </div>
            <div class="login-view__description">
              Пройдите регистрацию из нескольких шагов и используйте приложение на максимум
            </div>
    
            <input
              v-model="phoneNumber"
              v-mask="phoneMaskString"
              placeholder="Введите номер телефона"
              :class="[
                'login-view__input',
                { 'login-view__input_error': checkValidations && !telValide },
              ]"
            />
    
            <div class="login-view__user-types">
              <div class="title-standart">
                Выберите тип пользователя
              </div>
    
              <div class="login-view__user-types-list">
                <VVariant
                  v-for="userType in userTypes"
                  :active="userType.key === activUserTypeKey"
                  :key="userType.id"
                  class="login-view__user-type-item"
                  @click.native="activUserTypeKey = userType.key"
                >
                  <template #img>
                    <img
                      :src="userType.img"
                      alt="#"
                      class="login-view__user-type-img"
                    />
                  </template>
                  <template>
                    {{ userType.title }}
                  </template>
                </VVariant>
              </div>
            </div>
          </div>
  
          <VButton 
            :disabled="isLoading"
            variant="yellow"
            class="login-view__bottom-button"
            @click.native="next"
          >
            Далее
          </VButton>
        </div> 
      </vue-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VueBottomSheet from '@/components/ui/VBottomSheet.vue';
import VInput from '@/components/ui/VInput.vue';
import VVariant from '@/components/ui/VVariant';
import VButton from '@/components/ui/VButton.vue';

import { authUser } from '@/api/auth';

export default {
  name: 'LoginView',
  components: {
    VueBottomSheet,
    VInput,
    VVariant,
    VButton,
  },
  
  data: () => ({
    isLoading: false,
    overlay: true,
    maxWidth: "660px",
    maxHeight: "60vh",
    phoneMaskString: '+7 (###) ### ##-##',
    phoneMask: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/],
    clickToClose: false,
    swipeAble: false,
    showPan: false,
    isFullScreen: true,
    overlayColorSelect: "#0000004D",
    backgroundScrollable: false,
    backgroundClickable: false,
    userTypes: [
      {
        id: 0,
        title: 'Пассажир',
        key: 'user',
        img: require('@/assets/images/user.png'),
      },
      {
        id: 1,
        title: 'Водитель',
        img: require('@/assets/images/driver.png'),
        key: 'driver',
      },
    ],
    activUserTypeKey: 'user',
    phoneNumber: '',  //77471850499
    checkValidations: false,
  }),
  computed: {
    ...mapState('user', [
      'userInfo',
    ]),
    ...mapState('driver', [
      'driverInfo',
    ]),
    telValide() {
      return /^\+\d \(\d{3}\) \d{3} \d{2}-\d{2}$/i.test(this.phoneNumber);
    },
    clearNumber() {
      return this.phoneNumber.replace(/[^0-9]/g, '');
    },
  },

  created() {
    if(this.userInfo) {
      this.$router.replace('/user-main');
    }
    if(this.driverInfo) {
      this.$router.replace('/driver-profile');
    }
  },

  async mounted() {
    this.open();
  },

  methods: {
    ...mapMutations('auth', [
      'AUTH_USER_INFO_SAVE',
    ]),
    ...mapMutations('driver', [
      'CLEAR_DRIVER',
    ]),
    ...mapMutations('user', [
      'CLEAR_USER',
    ]),
    open() {
      this.$refs.myBottomSheet.open();
    },
    close() {
      this.$refs.myBottomSheet.close();
    },
    async next() {
      if (!this.telValide) {
        this.$notify({
          type: 'error',
          text: 'Заполните номер телефона'
        });
        this.checkValidations = true;
        return;
      }

      this.isLoading = true;
      try {
        this.AUTH_USER_INFO_SAVE({
          phoneNumber: this.clearNumber,
          role: this.activUserTypeKey,
        })
        const response = await authUser({
          phoneNumber: this.clearNumber,
          role: this.activUserTypeKey,
        })
        if (response) {
          await this.$router.push({path: '/confirmation-code', query: {userType: this.activUserTypeKey}});
        }
        //  console.log(response);
      } catch(e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login-view {
  position: relative;
  max-width: 660px;
  margin: 0 auto;
  overflow: hidden;
}
.bcg-img-conainer {
  position: fixed;
  width: 660px;
  left: 50%;
  transform: translate(-50%, 0);
  top: 0;
  z-index: 1;
}
.bcg-img {
  object-fit: contain;
  width: 100%;
  max-height: 50vh;
}

.login-view {

  &__sheet-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 24px 57px 24px;
    height: 100%;

    @media (max-height: 750px) {
      padding: 25px 24px 27px 24px;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: #000000;
    opacity: 0.8;
    margin-top: 10px;

    @media (max-height: 750px) {
      font-size: 14px;
      line-height: 15px;
    }
  }

  &__input {
    margin-top: 20px;
    width: 100%;
    border: 1px solid rgba(82, 82, 82, 0.2);
    border-radius: 10px;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.41px;
    color: #000000;
    padding: 13px 0px 15px 16px;

    &_error {
      border: 1px solid red;
    }

    @media (max-height: 750px) {
      padding: 8px 0px 9px 16px;
    }

    &::placeholder {
      opacity: 0.3;
    }
  }

  &__user-types {
    margin-top: 23px;
  }

  &__user-types-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 19px;
  }

  &__user-type-item {
    width: calc(100% / 2 - 20px);
    height: 106px;

    @media (max-height: 750px) {
      height: 90px;
    }
  }
  
  &__user-type-img {
    object-fit: contain;
  }

  &__bottom-button {
    width: 100%;
    margin-top: 41px;

    @media (max-height: 750px) {
      margin-right: 20px;
    }
  }
}
</style>
