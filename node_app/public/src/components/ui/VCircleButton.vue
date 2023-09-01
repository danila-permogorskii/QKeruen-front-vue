<template>
  <div
    :class="[
      'v-circle-button',
      `v-circle-button_${variant}`,
    ]"
  >
    <div v-if="$slots.default" class="v-circle-button__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCircleButton',

  props: {
    variant: {
      type: String,
      deafult: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.v-circle-button {
  position: relative;
  width: 44px;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #FFFFFF;

  @media (max-width: 360px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }

  &:active {
    background-color: #eaeaea;
  }

  &_gray {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__content {
    position: absolute;
    left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
  }
}
</style>
