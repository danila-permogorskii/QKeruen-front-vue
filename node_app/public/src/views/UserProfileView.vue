<template>
  <div class="user-profile-view">
    <div class="user-profile-view__img-amd-name">
      <div class="user-profile-view__img-box">
        <img
          :src="imageUrl"
          alt="#"
          class="user-profile-view__img"
        />
      </div>

      <div class="user-profile-view__name">
        {{ userInfo?.firstName }} {{ userInfo?.lastName }}
      </div>
    </div>

    <div class="user-profile-view__documents-and-actions">
      <div class="user-profile-view__actions">
        <div class="user-profile-view__action-item">
          <div
            class="user-profile-view__action-text"
            @click="$router.push('/user-edit')"
          >
            Изменить
          </div>
        </div>
      </div>
    </div>

    <div class="user-profile-view__buttons">
      <VButton
        textStart
        variant="gray"
        class="user-profile-view__button-item"
        @click.native="$router.push('/user-trips')"
      >
        Мои поездки

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
      <VButton 
        textStart 
        variant="gray" 
        class="user-profile-view__button-item"
        @click.native="$router.push('/user-search-offer-view')"
      >
        Поиск

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
      <VButton
        textStart
        variant="yellow"
        class="user-profile-view__button-item"
        @click.native="$router.push('/user-main')"
      >
        Создать заказ

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
    </div>

    <VButton
      variant="red"
      class="user-profile-view__sign-out-btn"
      @click.native="showSignOutModal = true"
    >
      Выйти
    </VButton>

    <div
      v-if="showSignOutModal"
      :class="[
        'user-profile-view__modal',
        { 'user-profile-view__modal_show': showSignOutModal }
      ]"
    >
      <div class="user-profile-view__modal-content">
        <div>
          Вы уверены что хотите выйти ?
  
          <div class="user-profile-view__sign-out-buttons">
            <VButton
              class="user-profile-view__sign-out-button-item"
              @click.native="showSignOutModal = false"
            >
              Нет
            </VButton>
            <VButton
              variant="red"
              class="user-profile-view__sign-out-button-item"
              @click.native="logout"
            >
              Выйти
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FileIcon from '@/assets/icons/file.svg';

import { apiDownloadAvatar } from '@/api/file';
import { convertBlobToBase64 } from '@/helpers/utils';

export default {
  name: 'UserProfileView',
  components: {
    VButton,
    ArrowLeft,
    FileIcon,
  },

  data: () => ({
    showSignOutModal: false,
    imageUrl: null,
  }),
  computed: {
    ...mapState('user', [
      'userInfo',
    ]),
  },

  async created() {
    if (!this.userInfo) {
      await this.$router.replace('/login');
      return;
    }

    try {
      if (this.userInfo.avatar) {
        const {data} = await apiDownloadAvatar(this.userInfo.avatar)
        const base64 = await convertBlobToBase64(data);
        this.imageUrl = base64;
      }
    } catch (e) {
      console.error(e);
      this.$notify({
        type: 'error',
        text: 'Что-то пошло не так'
      });
    }
  },

  methods: {
    ...mapMutations('auth', [
      'LOGOUT',
    ]),
    ...mapMutations('user', [
      'CLEAR_USER',
    ]),

    logout() {
      this.LOGOUT();
      this.CLEAR_USER();
      this.$router.replace('/login');
    },
  },
}
</script>

<style lang="scss" scoped>
.user-profile-view {
  padding: 81px 22px 45px 22px;

  &__img-box {
    width: 90px;
    min-width: 90px;
    height: 90px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 28px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__name {
    text-align: center;
    font-weight: 500;
    font-size: 19px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__documents-and-actions {
    margin-top: 23px;
  }

  &__action-item {
    width: calc(100% / 2 - 14px);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    padding: 12px;

    &_big {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 112px;
    }
  }

  &__action-img-box {
    width: 76px;
    margin: 0 auto;
  }

  &__action-img {
    object-fit: contain;
  }

  &__action-title {
    margin-top: 14px;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
    text-align: center;
  }

  &__action-text {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.02em;
    text-align: center;
    color: #000000;
  }

  &__actions {
    display: flex;
    justify-content: center;

    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  &__buttons {
    margin-top: 8px;
  }

  &__button-item {
    width: 100%;

    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  &__sign-out-btn {
    display: block;
    margin: 36px auto 0 auto;
    width: 123px;
    height: 48px;
  }

  &__modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    max-width: 660px;
    background-color: #00000072;
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: .3s;

    &_show {
      opacity: 1;
      z-index: 10;
      pointer-events: auto;
    }
  }

  &__modal-content {
    background: #fff;
    border-radius: 20px;
    padding: 10px 20px;
  }

  &__sign-out-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  &__sign-out-button-item {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
