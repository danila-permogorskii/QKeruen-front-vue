<template>
  <div class="user-main-view">
    <div v-if="!searching" class="user-main-view__controls">
      <VCircleButton @click.native="$router.push('/user-profile')">
        <div class="user-main-view__control-name">
          {{ userInfo?.lastName[0] }} {{ userInfo?.firstName[0] }}
        </div>
      </VCircleButton> 
    </div>

    <SearchPanel
      v-if="searching"
      class="user-main-view__search"
      @closeSearch="closeSearch" 
      @selectAdress="selectAdress"
    />

    <div v-if="searching || showPin" class="user-main-view__pain-container">
      <div
        :class="{
          'user-main-view__pain-select-button_hidden': painHidden,
        }"
        class="user-main-view__pain-select-button"
        @click="selectCoords"
      >
        Выбрать
      </div>

      <PinNewIcon
        class="user-main-view__pain-icon"
        :class="{'user-main-view__pain-icon_animate': mapTouch}"
        @click="showSelectPainButton"
      />
    </div>
    <yandex-map
      ref="myMap"
      :coords="cords"
      :zoom="zoom"
      map-type="map"
      :controls="[]"
      :style="{
        width: '100%',
        height: userStartBottomSheetShow ? 'calc(100%)' : '100%',
      }"
      class="user-main-view__map"
      @actionend="actionend"
      @balloonclose="balloonclose"
      @balloonopen="balloonopen"
      @boundschange="boundschange"
      @click="onClick"
      @contextmenu="contextmenu"
      @dblclick="dblclick"
      @destroy="destroy"
      @hintclose="hintclose"
      @hintopen="hintopen"
      @optionschange="optionschange"
      @sizechange="sizechange"
      @typechange="typechange"
      @touchstart.native="onTouchStart"
      @touchend.native="onTouchEnd"
    >
      <ymap-marker
        v-if="startPoint"
        marker-id="1"
        :coords="startPoint.coords"
        :balloon="{header: 'Точка 1'}"
        cluster-name="1"
      />
      <ymap-marker
        v-if="endPoint"
        marker-id="2"
        :coords="endPoint.coords"
        :balloon="{header: 'Точка 2'}"
        cluster-name="1"
      />
      <ymap-marker
        v-if="userPosition"
        marker-id="3"
        :coords="userPosition.coords"
        :balloon="{header: 'Ваше местоположение'}"
        :options="{
          preset: 'islands#circleDotIcon',
          iconColor: 'black'
        }"
        cluster-name="1"
      />
    </yandex-map>
    <div
      :style="userPositionStyle"
      class="user-main-view__user-position"
    >
      <VCircleButton @click.native="setUserPosition">
        <PinIcon class="user-main-view__user-position-icon" />
      </VCircleButton> 
    </div>

    <vue-bottom-sheet
      v-if="showBottomSheet"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :overlay="overlay"
      :click-to-close="clickToClose"
      :showPan="showPan"
      :swipeAble="swipeAble"
      :isFullScreen="isFullScreen"
      :backgroundScrollable="backgroundScrollable"
      :backgroundClickable="backgroundClickable"
      ref="userStartBottomSheet"
    >
      <div class="user-main-view__scheet-content">
        <div v-if="validationError" class="error-text">
          Заполните все данные и попробуйте еще раз
        </div>

        <div class="user-main-view__actions">
          <VVariant
            variant="white-gray"
            small
            :active-circle="false"
            class="user-main-view__action-item"
            @click.native="$router.push('/intercity')"
          >
            <template #img>
              <CityIcon />
            </template>
            Межгород
          </VVariant>
          <!-- <VVariant
            variant="white-gray"
            small
            :active-circle="false"
            class="user-main-view__action-item"
          >
            <template #img>
              <img 
                src="@/assets/images/truck-left.png" 
                alt="#"
                class="user-main-view__action-item-img"
              />
            </template>
            Грузовой
          </VVariant>
          <VVariant
            variant="white-gray"
            small
            :active-circle="false"
            class="user-main-view__action-item"
          >
            <template #img>
              <img 
                src="@/assets/images/types-of-machines/comfort.png" 
                alt="#"
                class="user-main-view__action-item-img"
              />
            </template>
            Комфорт
          </VVariant> -->
          <VVariant
            variant="white-gray"
            small
            :active-circle="false"
            class="user-main-view__action-item"
            @click.native="$router.push('/user-trips')"
          >
            <template #img>
              <img 
                src="@/assets/images/history.png" 
                alt="#"
                class="user-main-view__action-item-img"
              />
            </template>
            Мои поездки
          </VVariant>
        </div>

        <div class="user-main-view__adresses">
          <div class="user-main-view__scheet-inputs">
            <VInput
              :value="startPoint?.name"
              variant="lined"
              placeholder="Откуда"
              class="user-main-view__scheet-input-item"
              @click.native="openSearch('start')"
            >
              <template #left-icon>
                <div class="circle" :class="{'circle_active': changedPoint === 'start'}">
                  <span></span>
                </div>
              </template>
            </VInput>
            <VInput
              :value="endPoint?.name"
              variant="lined"
              placeholder="Куда"
              class="user-main-view__scheet-input-item"
              @click.native="openSearch('end')"
            >
              <template #left-icon>
                <div class="circle" :class="{'circle_active': changedPoint === 'end'}">
                  <span></span>
                </div>
              </template>
            </VInput>
          </div>
          <div class="user-main-view__reverse-btn" @click="reversePoints">
            <ReverseIcon class="user-main-view__reverse-icon" />
          </div>
        </div>
        <VInput
          v-model="price"
          variant="lined"
          type="number"
          placeholder="Цена"
          class="user-main-view__scheet-input-item"
        >
          <template #left-icon>
            <KztIcon />
          </template>
        </VInput>
        <VInput
          v-model="comments"
          textarea
          variant="lined"
          placeholder="Комментарий"
          class="user-main-view__scheet-input-item"
        >
          <template #left-icon>
            <CommentIcon />
          </template>
        </VInput>

        <VButton
          variant="yellow"
          :disabled="createOrderLoading"
          class="user-main-view__order-button"
          @click.native="createOrder"
        >
          Заказать
        </VButton>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
//размер области карты Area = 65 vh
import { mapState } from 'vuex';
import { ymapMarker, loadYmap } from 'vue-yandex-maps';

import VueBottomSheet from '@/components/ui/VBottomSheet.vue';
import VCircleButton from '@/components/ui/VCircleButton.vue';
import VVariant from '@/components/ui/VVariant.vue';
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import SearchPanel from '@/components/common/SearchPanel.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import CityIcon from '@/assets/icons/city.svg';
import ReverseIcon from '@/assets/icons/reverse.svg';
import CommentIcon from '@/assets/icons/comment.svg';
import PaymentIcon from '@/assets/icons/payment.svg';
import CommentBigIcon from '@/assets/icons/comment-big.svg';
import PinIcon from '@/assets/icons/pin.svg';
import PinNewIcon from '@/assets/icons/pin-new.svg';
import KztIcon from '@/assets/icons/kzt-cash.svg';

import { createOrderUser } from '@/api/user';


export default {
  name: 'UserMainView',
  components: {
    ymapMarker,
    VCircleButton,
    VInput,
    VueBottomSheet,
    VVariant,
    VButton,
    SearchPanel,
    ArrowLeft,
    CityIcon,
    ReverseIcon,
    CommentIcon,
    PaymentIcon,
    CommentBigIcon,
    PinIcon,
    PinNewIcon,
    KztIcon,
  },

  data: () => ({
    overlay: true,
    maxWidth: "660px",
    clickToClose: false,
    swipeAble: false,
    showPan: false,
    isFullScreen: false,
    overlayColorSelect: "rgb(0 0 0 / 10%)",
    backgroundScrollable: true,
    backgroundClickable: true,
    searchText: null,
    searchResults: [],
    searching: false,
    searched: false,
    startPoint: null,
    endPoint: null,
    changedPoint: 'start',
    zoom: 15,
    painHidden: true,
    price: null,
    userStartBottomSheetShow: true,
    showPin: true,
    mapTouch: false,
    createOrderLoading: false,
    showBottomSheet: true,
    price: null,
    comments: null,
    validationError: false,
    show: {
      price: false,
      comment: false,
    },
    isLoading: false,
    userPosition: null,
  }),

  computed: {
    ...mapState('user', [
      'userInfo',
    ]),
    cords() {
      // return [23435132.746701002, 11246266.402022969]
      return [51.12325234496515, 71.43060310725863];
    },
    maxHeight() {
      return '45vh';
    },
    userPositionStyle() {
      return {
        'bottom': '47vh',
      };
    }
  },

  async created() {
    if (!this.userInfo) {
      await this.$router.replace('/login');
    }
  },

  async mounted() {
    this.openUserStartBottomSheet();
    await loadYmap({
      apiKey: '8a3e4da0-9ef2-4176-9203-e7014c1dba6f',
      lang: 'ru_RU',
      coordorder: 'latlong',
      enterprise: false,
      version: '2.1'
    });

    await this.setMapMargins();
    await this.setUserPosition();
  },

  methods: {
    openUserStartBottomSheet() {
      this.userStartBottomSheetShow = true;
      this.$refs.userStartBottomSheet.open();
    },
    async getUserPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      })
      .then((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        return [
          latitude,
          longitude,
        ]
      })
      .catch((err) => {
        console.log('err', err);
        this.$notify({
          type: 'error',
          text: 'Что-то пошло не так, возможно вы не разрешили доступ к геопозиции',
        });
      });
    },
    async setUserPosition() {
      const position = await this.getUserPosition();

      if (position) {
        this.$refs.myMap.myMap.setCenter(position, 18);
        await this.setMapMargins();
        this.userPosition = {
          coords: position
        }
      }
    },
    closeUserStartBottomSheet() {
      this.userStartBottomSheetShow = false;
      this.$refs.userStartBottomSheet.close();
    },
    open(name) {
      this.$refs[name].open();
    },
    close(name) {
      this.$refs[name].close();
    },
    reversePoints() {
      const startPointOld = JSON.parse(JSON.stringify(this.startPoint));
      const endPointOld = JSON.parse(JSON.stringify(this.endPoint));


      this.startPoint = endPointOld;
      this.endPoint = startPointOld;
    },
    openSearch(point) {
      this.closeUserStartBottomSheet();
      this.searching = true;
      this.changedPoint = point;
    },

    async setMapMargins() {
      await this.$refs.myMap.myMap?.margin?.addArea({
        left: 0,
        bottom: 0,
        width: '100%',
        height: '45%',
      });
    },
    async changeMapZoomByObjects() {
      const map1 = this.$refs.myMap;
      const map = map1.myMap;
      await map.setBounds(map.geoObjects._boundsAggregator._geoBounds, {
        checkZoomRange: true, zoomMargin: 9,
      });
      const zoomEnd = map._zoom;
      this.zoom = zoomEnd - 3;
    },
    closeSearch() {
      this.openUserStartBottomSheet();
      this.searching = false;
      this.painHidden = true;
    },
    showSelectPainButton() {
      this.painHidden = !this.painHidden;
    },
    actionend() {
      console.log('actionend');
    },
    balloonclose() {
      console.log('balloonclose');
    },
    balloonopen() {
      console.log('balloonopen');
    },
    boundschange() {
      console.log('boundschange');
    },
    onClick() {
      console.log('click');
      this.showPin = true;
    },
    contextmenu() {
      console.log('contextmenu');
    },
    dblclick() {
      console.log('dblclick');
    },
    destroy() {
      console.log('destroy');
    },
    hintclose() {
      console.log('hintclose');
    },
    hintopen() {
      console.log('hintopen');
    },
    optionschange() {
      console.log('optionschange');
    },
    sizechange() {
      console.log('sizechange');
    },
    typechange() {
      console.log('typechange');
    },
    onTouchStart() {
      this.showPin = true;
      this.mapTouch = true;
      this.closeUserStartBottomSheet();
      this.painHidden = true;
    },
    onTouchEnd() {
      this.openUserStartBottomSheet();
      this.painHidden = false;
      this.mapTouch = false;
    },
    // async selectInterCity() {
    //   this.closeUserStartBottomSheet();
    //   this.intercity = !this.intercity
    //   setTimeout(async () => {
    //     this.showBottomSheet = false;
    //     await this.$nextTick();
    //     this.showBottomSheet = true;
    //     await this.$nextTick();
    //     console.log(this.$refs);
    //     this.openUserStartBottomSheet();
    //   }, 400)
    // },
    async createOrder() {
      if (
        !this.price
        || !this.comments
        || !this.startPoint
        || !this.endPoint
      ) {
        // this.$notify({
        //   type: 'error',
        //   text: 'Заполните все данные',
        // });
        this.validationError = true;
        return;
      }

      this.createOrderLoading = true;
      this.validationError = false;
      try {
        const response = await createOrderUser({
          userId: this.userInfo.id,
          latitudeFrom: String(this.startPoint.coords[0]),
          longitudeFrom: String(this.startPoint.coords[1]),
          latitudeTo: String(this.endPoint.coords[0]),
          longitudeTo: String(this.endPoint.coords[1]),
          comments: this.comments,
          price: Number(this.price),
          orderStatus: 0,
          type: 'comfort',
        })
        if (response.status === 200) {
          this.$notify({
            type: 'success',
            text: 'Заявка успешно создана',
          });

          await this.$router.push('/trips');
        } 
      } catch (e) {
        console.error(e);
      } finally {
        this.createOrderLoading = false
      }
    },
    selectAdress(actualAdress) {
      if (this.changedPoint === 'end') {
        this.endPoint = actualAdress;
      }

      if (this.changedPoint === 'start') {
        this.startPoint = actualAdress;
        this.changedPoint = 'end';
      }

      this.searchResults = [];
      this.searchText = null;
      if (this.startPoint && this.endPoint) {
        setTimeout(() => {
          this.changeMapZoomByObjects();

          setTimeout(() => {
            this.openUserStartBottomSheet();
            this.searching = false;
          }, 500);
        }, 500)
      } else {
        this.openUserStartBottomSheet();
        this.searching = false;
      }
    },
    async selectCoords() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      try {
        const coords = this.$refs.myMap.myMap.action._map.getCenter({
          useMapMargin: true,
        });
        const realCenter = this.$refs.myMap.myMap.action._map.getCenter({
          useMapMargin: false,
        });
        console.log(realCenter);

        const geocoder = await ymaps.geocode(coords);
        const objs = geocoder.geoObjects.toArray();
        const searchResults = [];
        for(let i = 0; i < objs.length; i++) {
          const a = objs[i];
          searchResults.push({
            ...objs[i].properties.getAll(),
            coords: objs[i].geometry['_coordinates'],
          });
        }
        const actualAdress = searchResults[0];
        if (this.changedPoint === 'end') {
          this.endPoint = actualAdress;
        }
        
        if (this.changedPoint === 'start') {
          this.startPoint = actualAdress;
          this.changedPoint = 'end';
        }

        this.searchResults = [];
        this.searchText = null;
        this.painHidden = true;

        if (this.startPoint && this.endPoint) {
          setTimeout(() => {
          this.changeMapZoomByObjects();

          setTimeout(() => {
            this.openUserStartBottomSheet();
            this.searching = false;
          }, 500);
          }, 500)
        } else {
          this.openUserStartBottomSheet();
          this.searching = false;
        }
      } catch (e) {
        console.eroor(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-main-view {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  &__controls {
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 660px;
    top: 15px;
    padding: 0 17px;
    z-index: 9999;
  }

  &__control-item {
    &:not(:first-child) {
      margin-top: 14px;
    }
  }

  &__control-name {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
    white-space: nowrap;
  }

  &__map {
    width: 100%;
    height: 100%;
  }

  &__scheet-content {
    padding: 22px 22px 25px 22px;
  }

  &__adresses {
    display: flex;
    align-items: center;
  }

  &__scheet-inputs {
    width: calc(100% - 50px);
  }

  &__scheet-input-item {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__reverse-btn {
    position: relative;
    width: 30px;
    min-width: 30px;
    height: 30px;
    background-color: #E2DB20;
    border-radius: 50%;
    margin-left: 20px;

    &:active {
      background: #bfb917;
    }
  }

  &__reverse-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__actions {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
  }

  &__action-item {
    width: calc(100% / 3 - 7px);
    height: 55px;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  &__search {
    position: fixed;
    width: 100%;
    max-width: 660px;
    top: 15px;
    padding: 0 17px;
    z-index: 99999;
  }

  &__pain-container {
    position: fixed;
    left: 50%;
    top: calc(55% / 2);
    width: 60px;
    height: 60px;
    transform: translate(-50%, -100%);
    z-index: 9999;
  }

  &__pain-icon {
    width: 60px;
    height: 60px;
    z-index: 1;

    &_animate {
      animation: gogogo 1.4s infinite linear;
      -webkit-animation: gogogo 1.4s infinite ease-out;
    }
  }

  &__user-position {
    position: fixed;
    width: 100%;
    max-width: 660px;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    transition: .2s;
    z-index: 9999;
  }

  &__user-position-icon {
    width: 22px;
  }

  &__bottom-sheet-top {
    margin-bottom: 10px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }

  &__pain-select-button {
    position: absolute;
    font-size: 15px;
    padding: 6px 11px;
    border-radius: 10px;
    background-color: #bb2900;
    transform: translate(-11px, 0);
    color: #fff;
    top: -36px;
    transition: .3s;
    z-index: 2;

    &_hidden {
      z-index: -1;
      top: -23px;
      transform: translate(-25%, 0) scale(0);
      pointer-events: none;
    }
  }

  &__action-item-img {
    height: 22px;
    object-fit: contain;
  }

  &__order-button {
    margin-top: 20px;
    width: 100%;
  }
}

.circle {
  position: relative;
  width: 16px;
  min-width: 16px;
  height: 16px;
  background-color: #cbcbcb;
  border-radius: 50%;

  &_active {
    background-color: #30289f;
  }

  & span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 8px;
    height: 8px;
    min-width: 8px;
    border-radius: 50%;
    background-color: #fff;
  }
}

.error-text {
  font-weight: 500;
  font-size: 15px;
  color: red;
  margin-bottom: 10px;
}

::v-deep .user-main-view__pain-icon {
  path {
    fill: #bb2900;
  }
} 

@keyframes gogogo {
  0% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -10px);
    -webkit-transform: translate(0, -10px);
  }
  100% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
  }
}
</style>
