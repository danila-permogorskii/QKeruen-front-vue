<template>
  <div class="contact-info">
    <div class="contact-info__avatar-box">
      <img
        :src="imageUrl"
        alt="#"
        class="contact-info__avatar-img"
      />
    </div>
    <div class="contact-info__fio">
      {{ contact.firstName }} {{ contact.lastName }}
    </div>
    <div
      v-for="([key, value], index) in contactInfoList"
      :key="index"
      class="contact-info__item"
    >
      {{ KEY_NAMES[key] }}: <span>{{ value }}</span>
    </div>

    <VButton
      iss="a"
      :href="`tel:${this.contact.phoneForMask}`"
      variant="yellow"
      class="contact-info__call-btn"
    >
      Позвонить
    </VButton>
    <VButton
      variant="red"
      small
      class="contact-info__close-contact-btn"
      @click.native="$emit('closeContact')"
    >
      Закрыть
    </VButton>
  </div>
</template>

<script>
import { apiDownloadAvatar } from '@/api/file';
import { convertBlobToBase64 } from '@/helpers/utils';

import { KEY_NAMES } from '@/helpers/consts';

import VButton from '@/components/ui/VButton.vue';

export default {
  name: 'ContactInfo',
  components: {
    VButton,
  },

  props: {
    contact: {
      type: Object,
      default: () => ({}),
    },
    contact: {
      type: Object,
      default: () => ({}),
    },
    contactInfoList: {
      type: Array,
      deafult: () => ([]),
    },
  },
  data: () => ({
    imageUrl: null,
    KEY_NAMES,
  }),

  async created() {
    try {
      if (this.contact.avatar) {
        const {data} = await apiDownloadAvatar(this.contact.avatar)
        const base64 = await convertBlobToBase64(data);
        this.imageUrl = base64;
      }
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-info {

  &__avatar-box {
    width: 65px;
    min-width: 65px;
    height: 65px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__item {
    font-weight: 500;
    font-size: 17px;
    line-height: 115%;

    & span {
      font-weight: 400;
    }
  }

  &__fio {
    margin-bottom: 15px;
    font-size: 19px;
    line-height: 115%;
    font-weight: 500;
  }

  &__call-btn {
    margin-top: 20px;
  }

  &__close-contact-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
