<template>
  <div class="trips-view">
    <div class="trips-view__header">
      <VCircleButton variant="gray" @click.native="$router.go(-1)">
        <ArrowLeftIcon />
      </VCircleButton>

      <div class="trips-view__title-mini">
        Поездки
      </div>
      <VCircleButton variant="gray" class="trips-view__hidden-element">
        <ArrowLeftIcon />
      </VCircleButton>
    </div>

    <div class="trips-view__content">
      <div class="trips-view__description">
        Вы можете найти удобную для вас поездку и связаться с водителем
      </div>

      <div class="trips-view__trips-list">
        <TripItem 
          v-for="item in 6"
          :key="item"
          class="trips-view__trip-item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VCircleButton from '@/components/ui/VCircleButton.vue';
import TripItem from '@/components/Trips/TripItem.vue';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default {
  name: 'TripsView',
  components: {
    VCircleButton,
    TripItem,
    ArrowLeftIcon,
  },
}
</script>

<style lang="scss" scoped>
.trips-view {
  padding: 15px 15px 45px 15px;

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
      margin-top: 22px;
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

