<template>
  <div class="driver-documents">
    <div class="driver-edit__header">
      <ArrowLeft @click="$router.go(-1)" />
    </div>

    <div class="driver-documents__item">
      <div class="driver-documents__item-title">
        Документ спереди
      </div>

      <div v-if="frontImg" class="driver-documents__item-img-box">
        <img
          :src="frontImg"
          alt="#"
          class="driver-documents__item-img"
        />
      </div>
      <div v-else class="div">
        Отсутствует
      </div>
    </div>

    <div class="driver-documents__item">
      <div class="driver-documents__item-title">
        Документ сзади
      </div>

      <div v-if="backImg" class="driver-documents__item-img-box">
        <img
          :src="backImg"
          alt="#"
          class="driver-documents__item-img"
        />
      </div>
      <div v-else class="div">
        Отсутствует
      </div>
    </div>
    

    <VButton
      variant="yellow"
      class="driver-documents__edit-btn"
      @click.native="$router.push('/driver-edit')"
    >
      Изменить документы
    </VButton>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { apiDownloadDocument } from '@/api/file';
import { convertBlobToBase64 } from '@/helpers/utils';

import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

export default {
  name: 'DriverDocuments',
  components: {
    VButton,
    ArrowLeft,
  },

  data: () => ({
    frontImg: null,
    backImg: null,
  }),
  computed: {
    ...mapState('driver', [
      'driverInfo',
    ]),
  },

  async created() {
    try {
      if (this.driverInfo.docsfront) {
        const {data} = await apiDownloadDocument(this.driverInfo.docsfront)
        const base64 = await convertBlobToBase64(data);
        this.frontImg = base64;
      }
      if (this.driverInfo.docsback) {
        const {data} = await apiDownloadDocument(this.driverInfo.docsback)
        const base64 = await convertBlobToBase64(data);
        this.backImg = base64;
      }
    } catch (e) {
      console.error(e);
      this.$notify({
        type: 'error',
        text: 'Что-то пошло не так'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.driver-documents {
  padding: 25px 15px 45px 15px;
  &__item {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }

  &__item-title {
    font-size: 22px;
    font-weight: 500;
    line-height: 25px;
  }

  &__item-img-box {
    width: 100%;
    margin-top: 20px;
  }

  &__item-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  &__edit-btn {
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
}
</style>