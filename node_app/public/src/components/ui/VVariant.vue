<template>
  <div
    :class="[
      {'v-variant_small': small},
      'v-variant',
      {'v-variant_active': active},
      `v-variant_${variant}`
    ]"
  >
    <div v-if="activeCircle" class="v-variant__active-circle">
      <div v-if="active" class="v-variant__active-circle-content"></div>
    </div>
    <slot name="img" />

    <div v-if="$slots.default" class="v-variant__text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VVariant',

  props: {
    variant: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    activeCircle: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.v-variant {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  border-radius: 10px;
  padding: 12px 15px;


  &__text {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: #000000;
    opacity: 0.8;
    margin-top: 5px;
  }

  &__active-circle {
    position: absolute;
    right: 8px;
    top: 7px;
    width: 11px;
    height: 11px;
    min-width: 11px;
    border-radius: 50%;
    border: 1px solid #E2DB20;
  }

  &__active-circle-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 7px;
    min-width: 7px;
    background: #E2DB20;
    border-radius: 50%;
  }

  &_small {
    padding: 7px 10px;
  }

  &_white {
    background-color: #fff;
    border-radius: 14px;
  }

  &_gray {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 14px;
  }

  &_white-gray {
    border-radius: 14px;
    border: 1px solid #cbcbcb;
  }
}

.v-variant_small .v-variant  {

  &__text {
    font-size: 12px;
    line-height: 15px;
  }

  &_active {

  }
}

.v-variant_small.v-variant_white-gray.v-variant {
  &_active {
    border: 1px solid #30289f;
  }
}
</style>