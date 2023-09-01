<template>
  <div class="download-instructions">
    <div class="download-instructions__header">
      <ArrowLeft @click="$router.go(-1)" />
    </div>

    <div class="download-instructions__content">
      <div>
        Инструкции по добавлению приложения на рабочий стол
      </div>
    </div>
  </div>
</template>

<script>
import ArrowLeft from '@/assets/icons/arrow-left.svg';

export default {
  name: 'DownloadInstructions',
  components: {
    ArrowLeft,
  },
}
</script>

<style lang="scss">
.download-instructions {
  height: 100vh;
  overflow: auto;

  &__header {
    padding: 15px 12px 10px 12px;
  }

  &__content {
    padding: 25px 24px 57px 24px;
  }
}
</style>