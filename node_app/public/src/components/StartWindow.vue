<template>
  <div class="start-window">
    <div class="start-window__img-box">
      <img
        src="@/assets/images/logo.jpg"
        alt="#"
        class="start-window__img" 
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartWindow',
}
</script>

<style lang="scss" scoped>
.start-window {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;

  &__img-box {
    position: fixed;
    width: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__img {
    object-fit: contain;
    width: 100%;
  }
}
</style>
