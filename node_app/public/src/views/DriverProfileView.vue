<template>
  <div class="driver-profile-view">
    <div class="driver-profile-view__img-amd-name">
      <div class="driver-profile-view__img-box">
        <img
          :src="imageUrl"
          alt="#"
          class="driver-profile-view__img"
        />
      </div>

      <div class="driver-profile-view__name">
        {{ driverInfo?.firstName }} {{ driverInfo?.lastName }}
      </div>
    </div>

    <div class="driver-profile-view__documents-and-actions">
      <div class="driver-profile-view__actions">
        <div class="driver-profile-view__action-item driver-profile-view__action-item_big">
          <div v-if="driverCarType?.img" class="driver-profile-view__action-img-box">
            <img
              :src="driverCarType.img"
              alt="#"
              class="driver-profile-view__action-img"
            />
          </div>
          <div class="driver-profile-view__action-title">
            {{ driverCarType?.title }}
          </div>
        </div>
        <div
          class="driver-profile-view__action-item driver-profile-view__action-item_big"
          @click="$router.push('/driver-documents')"
        >
          <FileIcon />
          <div class="driver-profile-view__action-title">
            Документы
          </div>
        </div>
      </div>
      <div class="driver-profile-view__actions">
        <div class="driver-profile-view__action-item">
          <div class="driver-profile-view__action-text">
            {{ driverInfo?.carNumber }}
          </div>
        </div>
        <div class="driver-profile-view__action-item">
          <div
            class="driver-profile-view__action-text"
            @click="$router.push('/driver-edit')"
          >
            Изменить
          </div>
        </div>
      </div>
    </div>

    <div class="driver-profile-view__buttons">
      <VButton
        textStart
        variant="gray"
        class="driver-profile-view__button-item"
        @click.native="$router.push('/driver-offers-history')"
      >
        Мои поездки

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
      <VButton
        textStart
        variant="gray"
        class="driver-profile-view__button-item"
        @click.native="$router.push('/driver-search-offer-view')"
      >
        Поиск

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
      <VButton
        textStart
        variant="yellow"
        class="driver-profile-view__button-item"
        @click.native="$router.push('/driver-create-offer')"
      >
        Создать поездку

        <template #right-icon>
          <ArrowLeft class="arrow-reverse" />
        </template>
      </VButton>
    </div>

    <VButton
      variant="red"
      class="driver-profile-view__sign-out-btn"
      @click.native="showSignOutModal = true"
    >
      Выйти
    </VButton>

    <div
      v-if="showSignOutModal"
      :class="[
        'driver-profile-view__modal',
        { 'driver-profile-view__modal_show': showSignOutModal }
      ]"
    >
      <div class="driver-profile-view__modal-content">
        <div>
          Вы уверены что хотите выйти ?
  
          <div class="driver-profile-view__sign-out-buttons">
            <VButton
              class="driver-profile-view__sign-out-button-item"
              @click.native="showSignOutModal = false"
            >
              Нет
            </VButton>
            <VButton
              variant="red"
              class="driver-profile-view__sign-out-button-item"
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
import { TRUCK_TYPES, CAR_TYPES } from '@/helpers/consts';

import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FileIcon from '@/assets/icons/file.svg';

import { apiDownloadAvatar } from '@/api/file';
import { convertBlobToBase64 } from '@/helpers/utils';

export default {
  name: 'DriverProfileView',
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
    ...mapState('driver', [
      'driverInfo',
    ]),
    driverCarType() {
      let car = TRUCK_TYPES.find(item => item.key === this.driverInfo.carModel);
      if (!car) {
        car = CAR_TYPES.find(item => item.key === this.driverInfo.carModel);
      }

      return car;
    },
  },

  async created() {
    if (!this.driverInfo) {
      await this.$router.replace('/login');
      return;
    }

    try {
      if (this.driverInfo.avatar) {
        const {data} = await apiDownloadAvatar(this.driverInfo.avatar)
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
    ...mapMutations('driver', [
      'CLEAR_DRIVER',
    ]),

    logout() {
      this.LOGOUT();
      this.CLEAR_DRIVER();
      this.$router.replace('/login');
    },
  },
}
</script>

<style lang="scss" scoped>
.driver-profile-view {
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
    width: 77px;
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
    justify-content: space-between;

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
