<template>
  <div class="trip">
    <!-- <div class="trip__driver">
      <div class="trip__driver-info">
        <div class="trip__img-box">
          <img
            src="https://fb.ru/media/i/5/6/9/2/4/7/i/569247.jpg"
            alt="#"
            class="trip__img"
          />
        </div>
        
        <div class="trip__driver-info-text">
          <div class="trip__driver-name">
            Бауыржан Раматдинов
          </div>
          <div class="trip__driver-number">
            +7 (747) 958-63-97
          </div>
        </div>
      </div>
    </div> -->

    <div class="trip__info">
      <div class="trip__text-info">
        <div class="trip__title">
          {{ trip.from }}-{{ trip.to }}
        </div>
        <div class="trip__description">
          {{ trip.comment }}
        </div>
      </div>

      <div v-if="driverCarType " lass="trip__car-info">
        <div class="trip__car-img-box">
          <img 
            src="@/assets/images/types-of-machines/minivan.png" 
            alt="#"
            class="trip__car-img" 
          />
        </div>

        <div class="trip__car-type">
          Минивэн
        </div>
      </div>
    </div>

    <div class="trip__price-info">
      <div class="trip__price-title">
        Стоимость
      </div>
      <div class="trip__price-value">
        {{ trip.price }} ₸
      </div>
    </div>

    <div v-if="$slots.bottomActions" class="trip__bottom-actions">
      <slot name="bottomActions" />
    </div>
  </div>
</template>

<script>
import { TRUCK_TYPES, CAR_TYPES } from '@/helpers/consts';

export default {
  name: 'TripItem',

  props: {
    trip: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    driverCarType() {
      if (!this.trip.carModel) return false;

      let car = TRUCK_TYPES.find(item => item.key === this.type.carModel);
      if (!car) {
        car = CAR_TYPES.find(item => item.key === this.type.carModel);
      }
      return car;
    },
  }
}
</script>

<style lang="scss" scoped>
.trip {
  padding-bottom: 10px;
  border-bottom: 1px solid #000000;

  &__driver {
    padding: 8.7px 0;
    border-bottom: 1px solid #000000;
  }

  &__img-box {
    width: 45px;
    min-width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &__driver-info {
    display: flex;
  }

  &__driver-info-text {
    margin-left: 9px;
  }

  &__driver-name {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: #000000;
    
  }

  &__driver-number {
    font-weight: 400;
    margin-top: 6px;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 22px 0;
  }

  &__text-info {
  }

  &__car-type {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    margin-top: 10px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
  }

  &__car-info {
    min-width: 68px;
    width: 68px;
    margin-left: 40px;
  }

  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__description {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 6px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
  }

  &__price-info {
    display: flex;
    justify-content: space-between;
  }

  &__price-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
  }

  &__price-value {
    font-weight: 700;
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.02em;
    color: #E2DB20;
  }

  &__bottom-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
