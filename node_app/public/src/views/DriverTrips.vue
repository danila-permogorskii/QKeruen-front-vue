<template>
  <div class="driver-trips">
    <div class="driver-trips__header">
      <VCircleButton variant="gray" @click.native="$router.go(-1)">
        <ArrowLeftIcon />
      </VCircleButton>

      <div class="driver-trips__title">
        Привет, {{ driverInfo.firstName }}
      </div>

      <VCircleButton variant="gray" @click.native="$router.push('/user-profile')">
        <div class="driver-trips__user-name">
          {{ driverInfo?.firstName[0] }} {{ driverInfo?.lastName[0] }}
        </div>
      </VCircleButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import VCircleButton from '@/components/ui/VCircleButton.vue';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default {
  name: 'DriverTrips',
  components: {
    VCircleButton,
    ArrowLeftIcon,
  },

  computed: {
    ...mapState('driver', [
      'driverInfo',
    ]),
  }
}
</script>

<style lang="scss" scoped>
.driver-trips {
  position: relative;
  padding: 15px 15px 45px 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__title-mini {
    font-weight: 500;
    font-size: 20px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
    margin: 30px 0 20px 0;
  }

  &__user-name {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    white-space: nowrap;
    color: #000000;
  }
}
</style>