<template>
  <div class="driver-offers-history">
    <div class="driver-offers-history__header">
      <VCircleButton variant="gray" @click.native="$router.go(-1)">
        <ArrowLeftIcon />
      </VCircleButton>

      <div class="driver-offers-history__title-mini">
        Поездки
      </div>
      <VCircleButton variant="gray" class="driver-offers-history__hidden-element">
        <ArrowLeftIcon />
      </VCircleButton>
    </div>

    <div class="driver-offers-history__content">
      <div class="driver-offers-history__description">
        История ваших поездок
      </div>

      <div v-if="trips" class="driver-offers-history__trips-list">
        <TripItem 
          v-for="tripItem in trips"
          :key="tripItem.id"
          :trip="tripItem"
          class="driver-offers-history__trip-item"
        >
          <template #bottomActions>
            <VButton
              variant="red"
              small
              @click.native="exitOffer(tripItem.id)"
            >
              Завершить поездку
            </VButton>
          </template>
        </TripItem>
      </div>

      <div v-if="isNoTrips">
        Кажется у вас нет ни одной поездки
      </div>
    </div>

    <div
      v-if="showExitOfferModal"
      :class="[
        'driver-offers-history__modal',
        { 'driver-offers-history__modal_show': showExitOfferModal }
      ]"
    >
      <div class="driver-offers-history__modal-content">
        <div>
          Вы уверены что хотите завершить поездку?

          <div class="driver-offers-history__sign-out-buttons">
            <VButton
              variant="red"
              small
              :disabled="deleteLoading || isLoading"
              class="driver-offers-history__sign-out-button-item"
              @click.native="realExitOffer"
            >
              Завершить поездку
            </VButton>
            <VButton
              variant="yellow"
              :disabled="deleteLoading || isLoading"
              small
              class="driver-offers-history__sign-out-button-item"
              @click.native="cancelExitOffer"
            >
              Отмена
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import VCircleButton from '@/components/ui/VCircleButton.vue';
import VButton from '@/components/ui/VButton.vue';
import TripItem from '@/components/Trips/TripItem.vue';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

import { getUserHistory, deleteUserOffer } from '@/api/user';

export default {
  name: 'UserTrips',
  components: {
    VCircleButton,
    VButton,
    TripItem,
    ArrowLeftIcon,
  },

  data: () => ({
    isNoTrips: false,
    trips: null,
    showExitOfferModal: false,
    exitingOfferId: null,
    deleteLoading: false,
  }),
  computed: {
    ...mapState('user', [
      'userInfo',
    ]),
  },

  async created() {
    await this.getDriverHistory();

  },

  methods: {
    async getDriverHistory() {
      this.isLoading = true;
      try {
        const { data } = await getUserHistory(this.userInfo.id);

        if (Array.isArray(data)) {
          this.trips = data;
        }
        if (!data) {
          this.trips = null;
          this.isNoTrips = true;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    exitOffer(offerId) {
      this.exitingOfferId = offerId;
      this.showExitOfferModal = true;
    },
    cancelExitOffer() {
      this.exitingOfferId = null;
      this.showExitOfferModal = false;
    },
    async realExitOffer() {
      this.deleteLoading = true;
      try {
        const response = await deleteUserOffer(this.exitingOfferId);
        if (response.status === 200) {
          this.$notify({
            type: 'success',
            text: 'Заказ успешно создан',
          });
          await this.getDriverHistory();
        }
      } catch (e) {
        console.error(e);
        this.$notify({
          type: 'error',
          text: 'Что-то пошло не так'
        });
      } finally {
        this.deleteLoading = false;
        this.cancelExitOffer();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.driver-offers-history {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 57px 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title-mini {
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__hidden-element {
    pointer-events: none;
    visibility: hidden;
  }

  &__user-name {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__adresses {
    display: flex;
    align-items: center;
  }

  &__scheet-inputs {
    width: calc(100% - 50px);
  }

  &__scheet-input-item {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__reverse-btn {
    position: relative;
    width: 30px;
    min-width: 30px;
    height: 30px;
    background-color: #E2DB20;
    border-radius: 50%;
    margin-left: 20px;

    &:active {
      background: #bfb917;
    }
  }

  &__reverse-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__description {
    margin-top: 21px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
    margin-bottom: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__cars {
    margin-top: 28px;
    z-index: 3;
    overflow-x: auto;
  }

  &__cars-list {
    display: flex;
  }

  &__car-type-item {
    width: 107px;
    height: 112px;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }

  &__truck-type-item {
    width: 150px;
    height: 112px;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }
  
  &__search-btn {
    width: 100%;
    height: 50px;
    margin-top: 35px;
  }

  &__trip-item {
    &:not(:first-child) {
      margin-top: 35px;
    }
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
    background-color: #00000072;
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: .3s;
    padding: 15px;

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
.title-mini {
  margin-bottom: 13px;
  font-weight: 700;
  font-size: 17px;
  line-height: 18px;
  letter-spacing: -0.24px;
  color: #000000;
  opacity: 0.8;
}
</style>

