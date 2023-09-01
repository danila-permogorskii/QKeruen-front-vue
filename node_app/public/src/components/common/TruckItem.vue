<template>
  <div
    :class="[
      'truck-item',
      { 'truck-item_active': active },
    ]"
  >
    <div class="truck-item__truck-type-img-box">
      <img
        :src="truckType.img"
        alt="#"
        class="truck-item__truck-type-img"
      />
    </div>

    <div class="truck-item__truck-type-info">
      <div class="truck-item__truck-type-title">
        {{ truckType.title }}
      </div>

      <div class="truck-item__truck-type-description">
        {{ truckType.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TruckItem',

  props: {
    active: {
      type: Boolean,
      deafult: false,
    },
    truckType: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.truck-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  border: 1px solid #30289f00;
  transition: .15s;

  &_active {
    border: 1px solid #30289f;
  }

  &__truck-type-img {
    width: 70px;
    object-fit: contain;
  }
  
  &__truck-type-info {
    margin-left: 20px;
  }

  &__truck-type-title {
    font-size: 16px;
    line-height: 18px;
    color: #121212;
    font-weight: 500;
  }

  &__truck-type-description {
    margin-top: 6px;
    font-size: 13px;
    line-height: 15px;
    color: #696969;
  }
}
</style>