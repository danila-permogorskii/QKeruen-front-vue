<template>
  <button
    :class="[
      'v-button',
      {'v-button_disabled': disabled },
      {'v-button_textStart': textStart},
      {'v-button_textDark': textDark},
      {'v-button_small': small},
      `v-button_${variant}`,
      `v-button_${iss}`,
    ]"
    :is="iss"
    :disabled="disabled"
  >
    <slot />

    <div
      v-if="$slots['right-icon']"
      class="v-button__right-icon"
    >
      <slot name="right-icon" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'VButton',

  props: {
    variant: {
      type: String,
      default: 'standart',
    },
    textStart: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    textDark: {
      type: Boolean,
      deafult: false,
    },
    iss: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style lang="scss" scoped>
.v-button {
  position: relative;
  display: block;
  padding: 14px 20px;
  background-color: #fff;
  text-decoration: none;
  border-radius: 14px;
  letter-spacing: -0.41px;

  @media (max-height: 750px) {
    padding: 10px 15px;
  }

  &:active {
    background: #bfb917;
  }

  &_textStart {
    display: flex;
    justify-content: space-between;
    text-align: start;
  }
  &_textDark {
    color: #000 !important;
  }

  &_standart {
    border: 0;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 14px;
    color: rgba(112, 112, 112, 0.6);

    &:active {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  &_standart-dark {
    border: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    color: rgba(0, 0, 0, 0.6);
  }

  &_gray {
    background: rgba(0, 0, 0, 0.1);

    &:active {
      background: rgba(0, 0, 0, 0.15);
    }
  }

  &_yellow {
    background: #E2DB20;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    color: #fff;

    &:active {
      background: #bfb917;
    }
  }

  &_red {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;  
    font-weight: 500;
    background-color: #fff;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #E30000;
    padding: 13px 10px;

    &:active {
      background: #f3f3f3;
    }
  }

  &_small {
    padding: 6px 10px;
  }

  &__right-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translate(0, -50%);
  }

  &_disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &_a {
    text-align: center;
  }
}
</style>
