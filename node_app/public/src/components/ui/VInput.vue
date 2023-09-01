<template>
  <label 
    :class="[
      'v-input', 
      { 'v-input_lined-input': variant === 'lined' },
    ]"
  >
    <div v-if="$slots['left-icon']" class="v-input__left-icon">
      <slot name="left-icon" />
    </div>

    <textarea
      v-if="textarea"
      ref="myInput"
      v-model="model"
      v-bind="inputProps"
      :class="[
        'v-input__hero',
        `v-input_${variant}`,
        {'v-input_big': big},
      ]"
    />
    <input
      v-else
      ref="myInput"
      v-model="model"
      v-bind="inputProps"
      :type="type"
      :class="[
        'v-input__hero',
        `v-input_${variant}`,
        {'v-input_big': big},
      ]"
      @keyup.enter="$emit('keyupEnter', $event)"
    />
  </label>
</template>

<script>
export default {
  name: 'VInput',

  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Введите текст',
    },
    type: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'standart',
    },
    big: {
      type: Boolean,
      deafult: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    timeOut: null,
  }),

  mounted() {
    if (this.autoFocus) {
      this.$refs.myInput.focus();
    }
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);

        clearTimeout(this.timeOut);

        this.timeOut = setTimeout(() => {
          this.$emit('lazyFetch');
        }, 700);
      },
    },
    inputProps() {
      return {
        placeholder: this.placeholder,
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;
  display: block;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.02em;

  &__hero {
    padding: 14px 0px 14px 17px;
    width: 100%;

    @media (max-height: 750px) {
      padding: 8px 0px 8px 12px;
    }
  }

  &_big {
    padding: 22px 0;
    font-weight: 500;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
    letter-spacing: -0.04em;
    color: #000000;

    @media (max-height: 750px) {
      padding: 15px 0;
    }
  }

  &_standart {
    border: 0;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 14px;

    &::placeholder {
      color: rgba(112, 112, 112, 0.6);
    }
  }

  &_standart-dark {
    border: 0;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 14px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &_light {
    border: 1px solid rgba(82, 82, 82, 0.2);
    border-radius: 10px;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.41px;
    color: #000000;
    padding: 13px 0px 15px 16px;

    @media (max-height: 750px) {
      padding: 8px 0px 9px 16px;
    }

    &::placeholder {
      opacity: 0.3;
    }
  }

  &_lined {
    border-radius: 0px;
    padding: 7px 12px 7px 6px;
    border-bottom: 1px solid #cbcbcb;
    margin-left: 5px;
  }
}

.v-input_lined-input {
  display: flex;
  align-items: center;

  & .v-input__left-icon {
    width: 20px;
    min-width: 20px;
  }
}
</style>
