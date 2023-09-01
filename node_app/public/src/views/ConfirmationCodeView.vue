<template>
  <div class="confirmation-code">
    <div class="confirmation-code__header">
      <ArrowLeft @click="$router.go(-1)" />
    </div>

    <div class="confirmation-code__sheet-content">
      <div>
        <div class="title-big">
          Код подтверждения
        </div>

        <div class="confirmation-code__description">
          Введите код который был отправлен на номер
          <span class="confirmation-code__description_bold">
            {{ phoneNumberByMask }}
          </span>
        </div>

        <VInput
          v-model="code"
          big
          placeholder="0000"
          class="confirmation-code__input"
          @keyupEnter="next"
        />

        <div v-if="codeError" class="confirmation-code__error">
          Произошла ошибка
        </div>
      </div>


      <div>
        <!-- v-if="repeatedReques" -->
        <div class="confirmation-code__repead">
          {{ !repeatAvailable ? 'Вы можете повторить отправку кода через минуту' : 'Вы можете повторить отправку кода !' }}
        </div>
        <VButton 
          :disabled="isLoading || !repeatAvailable"
          class="confirmation-code__bottom-button"
          @click.native="repeatCode"
        >
          Повторить отправку кода
        </VButton>

        <VButton 
          :disabled="isLoading"
          variant="yellow"
          class="confirmation-code__bottom-button"
          @click.native="next"
        >
          Продолжить
        </VButton>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { conformToMask } from 'vue-text-mask';

import VueBottomSheet from '@/components/ui/VBottomSheet.vue';
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

import { sendSMS, authUser, checkToken } from '@/api/auth';

export default {
  name: 'ConfirmationCodeView',
  components: {
    VueBottomSheet,
    VInput,
    VButton,
    ArrowLeft
  },

  data: () => ({
    isLoading: false,
    phoneMask: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/],
    overlay: true,
    maxWidth: "660px",
    maxHeight: "100%",
    clickToClose: false,
    swipeAble: false,
    showPan: false,
    isFullScreen: true,
    overlayColorSelect: "#0000004D",
    backgroundScrollable: false,
    backgroundClickable: false,
    code: null,
    codeError: false,
    repeatAvailable: false,
  }),
  computed: {
    ...mapState('auth', [
      'phoneNumber',
      'role',
    ]),
    phoneNumberByMask() {
      return this.phoneNumber ? conformToMask(this.phoneNumber, this.phoneMask).conformedValue : '';
    },
  },

  created() {
    if (!this.phoneNumber || !this.role) {
      this.$router.push('/login');
    }
  },
  mounted() {
    this.possibilityRepeatedRequest();
  },

  methods: {
    ...mapMutations('auth', [
      'LOGIN',
    ]),
    ...mapMutations('user', [
      'SAVE_USER_INFO',
    ]),
    ...mapMutations('driver', [
      'SAVE_DRIVER_INFO',
    ]),
    possibilityRepeatedRequest() {
      setTimeout(() => {
        this.repeatAvailable = true;
      }, 60000)
    },
    async repeatCode() {
      this.repeatAvailable = false;
      this.possibilityRepeatedRequest();

      try {
        await authUser({
          phoneNumber: this.phoneNumber,
          role: this.role,
        });
      } catch(e) {
        console.error(e);
      }
    },
    async next() { 
      this.isLoading = true;
      try {
        const { data } = await sendSMS({
          phoneNumber: this.phoneNumber,
          role: this.role,
          code: this.code,
        });
        this.LOGIN({
          token: data.token,
          role: this.role,
        });

        if (data.isAuthorized) {
          const { data: tokenData } = await checkToken();
          this.LOGIN({
            token: tokenData.Token,
            role: tokenData.type,
            authorize: data.isAuthorized,
          });

          if (tokenData.type === 'user') {
            this.SAVE_USER_INFO(tokenData);
            await this.$router.push('/user-main');
          }
          if (tokenData.type === 'driver') {
            this.SAVE_DRIVER_INFO(tokenData);
            await this.$router.push('/driver-profile');
          }
        }

        if (!data.isAuthorized) {
          if (this.role === 'user') {
            await this.$router.push('/user-edit');
            return;
          }
          if (this.role === 'driver') {
            await this.$router.push('/driver-edit');
            return;
          }
        }
      } catch(e) {
        this.codeError = true;
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.confirmation-code {
  height: 100vh;

  &__header {
    padding: 15px 12px 10px 12px;
  }

  &__sheet-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 24px 57px 24px;
    height: calc(100% - 44px);
  }

  &__input {
    width: 160px;
    margin: 0 auto;
    margin-top: 27px;
  }

  &__description {
    margin-top: 10px;

    &_bold {
      font-weight: 600;
    }
  }

  &__error {
    margin-top: 25px;
    text-align: center;
    color: red;
    font-weight: 500;
  }

  &__repead {
    margin-bottom: 10px;
    font-size: 12px;
    color: gray;
  }

  &__bottom-button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
