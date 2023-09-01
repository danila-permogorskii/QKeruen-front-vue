<template>
  <div class="intercity-view">
    <SearchPanel
      :class="[
        'intercity-view__search',
        { 'intercity-view__search_show': searchingGeoPosition }
      ]"
      :open="searchingGeoPosition"
      @closeSearch="closeSearch" 
      @selectAdress="selectAdress"
    />

    <div class="intercity-view__header">
      <VCircleButton variant="gray" @click.native="$router.go(-1)">
        <ArrowLeftIcon />
      </VCircleButton>

      <div class="intercity-view__title">
        Привет, {{ userInfo?.firstName }}
      </div>

      <VCircleButton variant="gray" @click.native="$router.push('/user-profile')">
        <div class="intercity-view__user-name">
          {{ userInfo?.firstName[0] }} {{ userInfo?.lastName[0] }}
        </div>
      </VCircleButton>
    </div>

    <div class="intercity-view__content">
      <div class="intercity-view__description">
        Поиск по местоположению
      </div>

      <div>
        <div class="title-mini">
          Поездка
        </div>

        <div class="intercity-view__adresses">
          <div class="intercity-view__scheet-inputs">
            <VButton
              textStart
              variant="standart-dark"
              placeholder="Откуда"
              class="intercity-view__scheet-input-item"
              @click.native="searchFrom"
            >
              {{ fromAdress ? fromAdress.text : 'Откуда' }}
            </VButton>
            <VButton
              textStart
              variant="standart-dark"
              placeholder="Куда"
              class="intercity-view__scheet-input-item"
              @click.native="searchTo"
            >
              {{ toAdress ? toAdress.text : 'Куда' }}
            </VButton>
          </div>
          <!-- @click="reversePoints" -->
          <div class="intercity-view__reverse-btn" @click="reverseAdresses">
            <ReverseIcon class="intercity-view__reverse-icon" />
          </div>
        </div>
      </div>

      <div class="intercity-view__cars">
        <div class="title-mini">
          Такси
        </div>

        <div class="intercity-view__cars-list">
          <VVariant
            v-for="carType in carTypes"
            :key="carType.id"
            :active="form.type === carType.key"
            variant="gray"
            class="intercity-view__car-type-item"
            @click.native="form.type = carType.key"
          >
            <template #img>
              <img
                :src="carType.img"
                alt="#"
              />
            </template>
            <template>
              {{ carType.title }}
            </template>
          </VVariant>
        </div>
      </div>

      <div class="intercity-view__cars">
        <div class="title-mini">
          Грузовые
        </div>

        <div class="intercity-view__trucks-list">
          <TruckItem
            v-for="truckType in trucksTypes"
            :key="truckType.id"
            :truckType="truckType"
            :active="form.type === truckType.key"
            class="intercity-view__truck-type-item"
            @click.native="form.type = truckType.key"
          />
        </div>
      </div>

      <VButton
        variant="yellow"
        class="intercity-view__search-btn"
        @click.native="searchOffers"
      >
        Поск
      </VButton>
    </div>

    <div v-if="searchingOffers">
      Поиск...
    </div>

    <div v-if="offersSearched && seaerchedOffers && Array.isArray(seaerchedOffers)">
      <div
        v-for="seaerchedOffer in seaerchedOffers"
        :key="seaerchedOffer.id"
        class="intercity-view__searched-item"
      >
        <div class="intercity-view__searched-item-positions">
          {{ seaerchedOffer.from }} - {{ seaerchedOffer.to }}
        </div>
        <div v-if="seaerchedOffer.price || seaerchedOffer.price === 0" class="intercity-view__searched-item-price">
          Цена: <span>{{ seaerchedOffer.price }} ₸</span>
        </div>
        <div v-if="seaerchedOffer.comment" class="intercity-view__searched-item-comment-box">
          <div class="intercity-view__searched-item-comment-title">
            Комментарий:
          </div>
          <div class="intercity-view__searched-item-comment-text">
            {{ seaerchedOffer.comment }}
          </div>
        </div>

        <VButton
          variant="yellow"
          class="intercity-view__recive-btn"
          @click.native="receiveOffer(seaerchedOffer)"
        >
          Взять заявку
        </VButton>
      </div>
    </div>
    <div v-if="offersSearched && !seaerchedOffers">
      Ничего не найдено
    </div>

    <div
      v-if="showCreateOfferModal"
      :class="[
        'intercity-view__modal',
        { 'intercity-view__modal_show': showCreateOfferModal }
      ]"
    >
      <div class="intercity-view__modal-content">
        <div>
          Вы уверены что хотите взять заявку ?
  
          <div class="intercity-view__sign-out-buttons">
            <VButton
              variant="red"
              class="intercity-view__sign-out-button-item"
              @click.native="cancelOffer"
            >
              Отмена
            </VButton>
            <VButton
              variant="yellow"
              :disabled="isLoading"
              class="intercity-view__sign-out-button-item"
              @click.native="goOffer"
            >
              Взять заявку
            </VButton>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showContactInfoModal"
      :class="[
        'intercity-view__modal',
        { 'intercity-view__modal_show': showContactInfoModal }
      ]"
    >
      <div class="intercity-view__modal-content">
        <ContactInfo
          :contact="contactInfoPhone"
          :contactInfoList="contactInfoList"
          @closeContact="closeContact"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { TRUCK_TYPES, CAR_TYPES } from '@/helpers/consts';
import { conformToMask } from 'vue-text-mask';

import SearchPanel from '@/components/common/SearchPanel.vue';
import TruckItem from '@/components/common/TruckItem';
import VCircleButton from '@/components/ui/VCircleButton.vue';
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import VVariant from '@/components/ui/VVariant.vue';
import ContactInfo from '@/components/common/ContactInfo';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ReverseIcon from '@/assets/icons/reverse.svg';

import { fetchUserOffers } from '@/api/user';
import { getDriverInfoById } from '@/api/driver';

export default {
  name: 'UserSearchOfferView',
  components: {
    SearchPanel,
    TruckItem,
    VCircleButton,
    VButton,
    VInput,
    VVariant,
    ContactInfo,
    ArrowLeftIcon,
    ReverseIcon,
  },

  data: () => ({
    isLoading: false,
    searchingGeoPosition: false,
    phoneMask: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/],
    carTypes: CAR_TYPES,
    trucksTypes: TRUCK_TYPES,
    form: {
      from: null,
      to: null,
      type: null,
    },
    fromAdress: null,
    toAdress: null,
    changedPoint: '',
    offersSearched: false,
    searchingOffers: false,
    seaerchedOffers: null,
    showCreateOfferModal: null,
    receiveOfferData: null,
    showContactInfo: false,
    contactInfo: null,
    showContactInfoModal: false,
  }),
  computed: {
    ...mapState('user', [
      'userInfo',
    ]),
    carInfo() {
      if (!this.contactInfo) return;
      let car = null;
      car = CAR_TYPES.find((item) => item.key = this.contactInfo.carModel)

      if (!car) {
        car = TRUCK_TYPES.find((item) => item.key = this.contactInfo.carModel)
      }

      return car;
    },
    contactInfoPhone() {
      if (!this.contactInfo) return;

      return {
        ...this.contactInfo,
        phoneForMask: conformToMask(this.contactInfo.phone, this.phoneMask).conformedValue,
      }
    },
    contactInfoList() {
      if (!this.contactInfo) return;

      const { id, docsback, docsfront, firstName, lastName, avatar, inn, carModel, phone, ...all } = this.contactInfo;

      return Object.entries({
        phone: phone ? conformToMask(phone, this.phoneMask).conformedValue : phone,
        carModel: this.carInfo?.title,
        ...all,
      });
    },
  },

  methods: {
    searchFrom() {
      this.changedPoint = 'from';
      this.searchingGeoPosition = true;
    },
    searchTo() {
      this.changedPoint = 'to';
      this.searchingGeoPosition = true;
    },
    closeSearch() {
      this.changedPoint = '';
      this.searchingGeoPosition = false;
    },
    selectAdress(actualAdress) {
      if (this.changedPoint === 'from') {
        this.fromAdress = actualAdress;
      }
      if (this.changedPoint === 'to') {
        this.toAdress = actualAdress;
      }

      this.changedPoint = '';
      this.searchingGeoPosition = false;
    },
    reverseAdresses() {
      const oldFromAdress = JSON.parse(JSON.stringify(this.fromAdress));
      const oldToAdress = JSON.parse(JSON.stringify(this.toAdress));

      this.fromAdress = oldToAdress;
      this.toAdress = oldFromAdress;
    },
    async searchOffers() {
      if (
        !this.fromAdress
        || !this.form.type
        || !this.toAdress
      ) {
        this.$notify({
          type: 'error',
          text: 'Заполните форму'
        });
        return;
      }
      this.isLoading = true;
      this.searchingOffers = true;
      this.offersSearched = false;

      try {
        const data = {
          ...this.form,
          from: this.fromAdress.text,
          to: this.toAdress.text,
        }

        const response = await fetchUserOffers(data);
        if (response && response.status === 200) {
          const { data } = response;
          this.seaerchedOffers = data;
        }
      } catch(e) {
        console.error(e);
        this.$notify({
          type: 'error',
          text: 'Что-то пошло не так'
        });
      } finally {
        this.isLoading = false;
        this.searchingOffers = false;
        this.offersSearched = true;
      }
    },
    receiveOffer(data) {
      this.showCreateOfferModal = true;
      this.receiveOfferData = data;
    },
    cancelOffer() {
      this.receiveOfferData = null;
      this.showCreateOfferModal = false;
    },
    closeContact() {
      this.contactInfo = null;
      this.showContactInfoModal = false;
    },
    async goOffer() {
      this.isLoading = true;
      try {
        const { data } = await getDriverInfoById(this.receiveOfferData.driver);
        this.showCreateOfferModal = false;
        this.receiveOfferData = null;
        this.contactInfo = data;
        this.showContactInfoModal = true;

      } catch (e) {
        console.log(e);
        this.$notify({
          type: 'error',
          text: 'Что-то пошло не так'
        });
      } finally {
        this.isLoading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.intercity-view {
  position: relative;
  padding: 15px 15px 45px 15px;

  &__search {
    position: fixed;
    padding: 15px 10px;
    width: 100%;
    max-width: 660px;
    height: 100vh;
    left: 50%;
    transform: translate(-50%, 0);
    top: 0;
    backdrop-filter: blur(12px);
    z-index: 9;
    background-color: rgb(122 122 122 / 43%);
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: .15s;

    &_show {
      z-index: 9;
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__user-name {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    letter-spacing: -0.02em;
    color: #000000;
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

    &_textarea {
      height: 100px;
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

  &__description {
    margin-top: 21px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #000000;
    opacity: 0.8;
    margin-bottom: 20px;
  }

  &__content {
    margin-bottom: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__cars {
    margin-top: 28px;
    z-index: 3;
    overflow-x: auto;
  }

  &__search-btn {
    width: 100%;
    height: 50px;
    margin-top: 35px;
  }

  &__comment-and-price {
    margin-top: 12px;
  }

  &__searched-item {
    padding: 14px 15px;
    border-radius: 10px;
    background-color: #efefef;
    box-shadow: 0 0 15px -1px rgba(82, 82, 82, 0.1019607843);

    &:not(:first-child) {
      margin-top: 15px;
    }
  }

  &__searched-item-positions {
    font-weight: 500;
    font-size: 17px;
    color: rgb(32, 32, 204);
  }
  &__searched-item-price {
    font-size: 15px;
    line-height: 18px;
    margin-top: 10px;

    & span {
      color: rgb(0, 0, 0);
      font-weight: 500;
    }
  }
  &__searched-item-comment-box {
    background-color: #fff;
    padding: 3px 7px 6px 7px;
    border-radius: 10px;
    margin-top: 10px;
  }
  &__searched-item-comment-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    margin-top: 7px;
    color: rgb(56, 56, 56);
  }
  &__searched-item-comment-text {
    font-size: 14px;
    line-height: 16px;
    margin-top: 7px;
  }
  &__recive-btn {
    display: block;
    margin-top: 10px;
  }
  &__modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    background-color: #00000072;
    pointer-events: none;
    z-index: -1;
    opacity: 0;
    transition: .3s;

    &_show {
      opacity: 1;
      z-index: 10;
      pointer-events: auto;
    }
  }

  &__modal-content {
    background: #fff;
    border-radius: 20px;
    padding: 10px 20px;
  }

  &__sign-out-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  &__sign-out-button-item {
    &:not(:first-child) {
      margin-left: 10px;
    }
  }

  &__search-btn {
    width: 100%;
    height: 50px;
    margin-top: 35px;
  }

  &__scheet-input-item {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__comment-and-price {
    margin-top: 12px;
  }

  &__cars {
    margin-top: 28px;
    z-index: 3;
    overflow-x: auto;
  }

  &__cars-list {
    display: flex;
    justify-content: space-between;
  }

  &__car-type-item {
    width: calc(100% / 3 - 12px);
    height: 112px;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }

  &__truck-type-item {

    &:not(:first-child) {
      margin-top: 12px;
    }
  }
  
  &__search-btn {
    width: 100%;
    height: 50px;
    margin-top: 35px;
  }

  &__scheet-input-item {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__comment-and-price {
    margin-top: 12px;
  }
}
.title-mini {
  margin-bottom: 13px;
  font-weight: 700;
  font-size: 17px;
  line-height: 18px;
  letter-spacing: -0.24px;
  color: #000000;
  opacity: 0.8;
}
</style>
