<template>
  <div class="search-result-item">
    <div
      v-html="searchItem.balloonContentBody"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchResultItem',

  props: {
    searchItem: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.search-result-item {
  background-color: #fafafa;
  border: 1px solid #d3d3d3;
  padding: 7px 10px; 
  border-radius: 5px;
  color: #424242;
}
</style>
