<template>
  <div class="search-panel">
    <div class="search-panel__search-panel">
      <VCircleButton
        class="search-panel__search-close"
        @click.native="$emit('closeSearch')"
      >
        <ArrowLeft />
      </VCircleButton>
      <VInput
        v-model="searchText"
        autoFocus
        variant="light"
        class="search-panel__search-panel-input"
        @keyupEnter="onClickSearch"
        @lazyFetch="onClickSearch"
      />
      <VCircleButton 
        class="search-panel__search-panel-btn"
        @click.native="onClickSearch"
      >
        <SearchIcon />
      </VCircleButton>
    </div>
    
    <div v-if="searched" class="search-panel__search-results">
      <div class="search-panel__search-results-title">
        Результаты поиска
      </div>
      <div v-if="searchResults.length" class="search-panel__search-results-list">
        <SearchResultItem
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          :searchItem="searchResult"
          class="search-panel__search-results-item"
          @click.native="selectAdress(searchResult.id)"
        />
      </div>

      <div v-else>
        По вашему запросу ничего не найдено
      </div>
    </div>
  </div>
</template>

<script>
import { loadYmap } from 'vue-yandex-maps';
import SearchResultItem from '@/components/common/SearchResultItem.vue';
import VInput from '@/components/ui/VInput.vue';
import VCircleButton from '@/components/ui/VCircleButton.vue';
import SearchIcon from '@/assets/icons/search.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

export default {
  name: 'SearchPanel',
  components: {
    SearchResultItem,
    VInput,
    VCircleButton,
    SearchIcon,
    ArrowLeft,
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    searchResults: [],
    searched: false,
    searchText: '',
  }),

  watch: {
    open() {
      this.clearSearch();
    },
  },

  async mounted() {
    await loadYmap({
      apiKey: '8a3e4da0-9ef2-4176-9203-e7014c1dba6f',
      lang: 'ru_RU',
      coordorder: 'latlong',
      enterprise: false,
      version: '2.1'
    });
  },

  methods: {
    async onClickSearch() {
      this.searchResults = [];
      const geocoder = await ymaps.geocode(this.searchText);
      const objs = geocoder.geoObjects.toArray();

      for(let i = 0; i < objs.length; i++) {
        this.searchResults.push({
          ...objs[i].properties.getAll(),
          coords: objs[i].geometry['_coordinates'],
          id: Math.floor(Math.random() * 60000),
        });
      }

      this.searched = true;
    },
    clearSearch() {
      this.searchResults = [];
      this.searched = false;
      this.searchText = '';
    },
    selectAdress(id) {
      const actualAdress = this.searchResults.find((item) => item.id === id);
      this.$emit('selectAdress', actualAdress);
    },
  },
}
</script>

<style lang="scss" scoped>
.search-panel {
  
  &__search-panel {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__search-panel-input {
    width: 100%;
  }

  &__search-panel-btn {
    margin-left: 10px;
  }

  &__search-close {
    margin-right: 10px;
  }

  &__search-results {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 0 10px 1px #0000002c;
  }

  &__search-results-title {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 500;
  }

  &__search-results-list {
    max-height: 30vh;
    overflow-y: auto;
  }

  &__search-results-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>