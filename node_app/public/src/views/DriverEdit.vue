<template>
  <div class="driver-edit">
    <div class="driver-edit__header">
      <ArrowLeft @click="$router.go(-1)" />
    </div>

    <div class="driver-edit__sheet-content">
      <div>
        <div class="title-big">
          {{ isEdit ? 'Изменение данных о водителе' : 'Регистрация' }}
        </div>

        <div class="driver-edit__description">
          Заполните данные ниже
        </div>

        <div class="driver-edit__inputs">
          <VInput
            v-model="form.firstName"
            placeholder="Имя"
            class="driver-edit__input"
          />
          <VInput
            v-model="form.lastName"
            placeholder="Фамилия"
            class="driver-edit__input"
          />
          <VInput
            v-model="form.inn"
            placeholder="ИИН"
            class="driver-edit__input"
          />
          <div class="driver-edit__form-button color-select-block">
            <VButton 
              textStart
              :textDark="!!form.carColor"
              class="driver-edit__form-button"
            >
              {{ form.carColor ? form.carColor : 'Цвет машины' }}
            </VButton>
            <select
              v-model="form.carColor"
              class="color-select-block__hero"
            >
              <option disabled value="">Выберите цвет машины</option>
              <option
                v-for="color in carColors"
                :key="color"
                :value='color'
              >
                {{ color }}
              </option>
            </select>
          </div>
 
          <VInput
            v-model="form.carNumber"
            placeholder="Номер машины"
            class="driver-edit__input"
          />
          <input
            ref="ava-file-input"
            type="file"
            accept="image/png, image/jpeg"
            class="input-hidden"
            @change="inputAvatar"
          />
          <input
            ref="front-file-input"
            type="file"
            accept="image/png, image/jpeg"
            class="input-hidden"
            @change="inputFront"
          />
          <input
            ref="back-file-input"
            type="file"
            accept="image/png, image/jpeg"
            class="input-hidden"
            @change="inputBack"
          />
          <VButton
            textStart
            class="driver-edit__form-button"
            :textDark="!!avatarFile || !!form.avatar"
            @click.native="openInputAvatar"
          >
            <template v-if="avatarFile">
              {{ avatarFile ? 'Автарака выбрана' : 'Фото профиля в формате PNG' }}
            </template>
            <template v-else>
              {{ form.avatar ? 'Фото аватара выбрано, нажмите что-бы изменить' : 'Фото профиля в формате PNG' }}
            </template>

            <template #right-icon>
              <ArrowLeft class="arrow-reverse" />
            </template>
          </VButton>
          <VButton
            textStart
            :textDark="!!selectedCarType"
            class="driver-edit__form-button"
            @click.native="carTypeOpen"
          >
            {{ selectedCarType ? `Тип машины: ${ selectedCarType.title }` : 'Выбрать тип машины' }}

            <template #right-icon>
              <ArrowLeft class="arrow-reverse" />
            </template>
          </VButton>
          <VButton
            textStart
            :textDark="!!frontFile || !!form.docsfront"
            class="driver-edit__form-button"
            @click.native="openInputFront"
          >
            
            <template v-if="frontFile">
              {{ frontFile ? 'Фото документа спереди выбрано' : 'Фото документа спереди в формате PNG' }}
            </template>
            <template v-else>
              {{ form.docsfront ? 'Фото документа спереди выбрано, нажмите что-бы изменить' : 'Фото документа спереди в формате PNG' }}
            </template>

            <template #right-icon>
              <ArrowLeft class="arrow-reverse" />
            </template>
          </VButton>
          <VButton 
            textStart
            :textDark="!!backFile || !!form.docsback"
            class="driver-edit__form-button"
            @click.native="openInputBack"
          >
            
            <template v-if="backFile">
              {{ backFile ? 'Фото документа сзади выбрано' : 'Фото документа сзади в формате PNG' }}
            </template>
            <template v-else>
              {{ form.docsback ? 'Фото документа сзади выбрано, нажмите что-бы изменить' : 'Фото документа сзади в формате PNG' }}
            </template>

            <template #right-icon>
              <ArrowLeft class="arrow-reverse" />
            </template>
          </VButton>
        </div>
      </div>

      <VButton 
        :disabled="isLoading"
        variant="yellow"
        class="driver-edit__bottom-button"
        @click.native="onClickSave"
      >
        Сохранить
      </VButton>
    </div> 

    <vue-bottom-sheet
      :max-width="maxWidth"
      :max-height="maxHeight"
      :overlay="overlay"
      :click-to-close="clickToClose"
      :showPan="showPan"
      :swipeAble="swipeAble"
      :isFullScreen="isFullScreen"
      :backgroundScrollable="backgroundScrollable"
      :backgroundClickable="backgroundClickable"
      ref="carTypeSheet"
    >
      <div class="driver-edit__sheet-conent">
        <div class="driver-edit__cars">
          <VVariant
            v-for="carType in carTypes"
            :key="carType.id"
            :active="selectedCarType?.key === carType.key"
            variant="gray"
            class="driver-edit__car-item"
            @click.native="selectCar(carType)"
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

        <div class="driver-edit__trucks">
          <TruckItem
            v-for="truckType in trucksTypes"
            :key="truckType.id"
            :truckType="truckType"
            :active="selectedCarType?.key === truckType.key"
            class="driver-edit__truck-item"
            @click.native="selectCar(truckType)"
          />
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TRUCK_TYPES, CAR_TYPES } from '@/helpers/consts';
import { CAR_COLORS } from '@/helpers/consts';

import VueBottomSheet from '@/components/ui/VBottomSheet.vue';
import VVariant from '@/components/ui/VVariant.vue';
import TruckItem from '@/components/common/TruckItem.vue';
import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

import { createDriver, editDriver } from '@/api/driver';
import { apiUploadAvatar, apiUploadDocument } from '@/api/file';

export default {
  name: 'DriverEdit',
  components: {
    VueBottomSheet,
    VVariant,
    TruckItem,
    VInput,
    VButton,
    ArrowLeft
  },

  data: () => ({
    isLoading: false,
    overlay: true,
    maxWidth: "660px",
    maxHeight: "80vh",
    clickToClose: true,
    swipeAble: true,
    showPan: false,
    isFullScreen: true,
    overlayColorSelect: "#0000004D",
    backgroundScrollable: false,
    backgroundClickable: false,
    code: null,
    trucksTypes: TRUCK_TYPES,
    carTypes: CAR_TYPES,
    carColors: CAR_COLORS,
    selectedCarType: null,
    avatarFile: null,
    frontFile: null,
    backFile: null,
    form: {
      firstName: null,
      lastName: null,
      inn: null,
      avatar: null,
      carColor: null,
      carNumber: null,
      carModel: null,
      docsback: null,
      docsfront: null,
      carType: null,
    },
    fileTypes: {
      'image/png': 'png',
      'image/jpeg': 'jpeg',
      'image/jpg': 'jpg',
    }
  }),

  computed: {
    ...mapState('auth', [
      'phoneNumber',
    ]),
    ...mapState('driver', [
      'driverInfo',
    ]),

    isEdit() {
      return !!this.driverInfo;
    },
  },

  async created() {
    if (this.isEdit) {
      const formKeys = Object.keys(this.form);
      formKeys.forEach(item => {
        this.form[item] = this.driverInfo[item];
      })
      this.selectedCarType = CAR_TYPES.find(item => item.key === this.driverInfo.carModel);
      if (!this.selectedCarType) {
        this.selectedCarType = TRUCK_TYPES.find(item => item.key === this.driverInfo.carModel);
      }
      return;
    }

    if (!this.phoneNumber) {
      return await this.$router.replace('/login');
    }
  },

  methods: {
    ...mapMutations('driver', [
      'SAVE_DRIVER_INFO',
    ]),
    carTypeOpen() {
      this.$refs.carTypeSheet.open();
    },
    carTypeClose() {
      this.$refs.carTypeSheet.close();
    },
    selectCar(carType) {
      this.selectedCarType = carType;
      this.carTypeClose();
    },
    openInputAvatar() {
      this.$refs['ava-file-input'].click();
    },
    openInputFront() {
      this.$refs['front-file-input'].click();
    },
    openInputBack() {
      this.$refs['back-file-input'].click();
    },
    async inputAvatar(e) {
      const file = e.target.files[0];
      this.avatarFile = file;
    },
    async inputFront(e) {
      const file = e.target.files[0];
      this.frontFile = file;
    },
    async inputBack(e) {
      const file = e.target.files[0];
      this.backFile = file;
    },
    async uploadAvatar(name) {
      try {
        await apiUploadAvatar(this.avatarFile, name)
      } catch(err) {
        console.error(err);
      }
    },
    async uploadFront(name) {
      try {
        await apiUploadDocument(this.frontFile, name)
      } catch(err) {
        console.error(err);
      }
    },
    async uploadBack(name) {
      try {
        await apiUploadDocument(this.backFile, name)
      } catch(err) {
        console.error(err);
      }
    },
    async onClickSave() {
      if (
        !this.form.firstName
        || !this.form.lastName
        || !this.form.inn
        || !this.selectedCarType
        || !(this.avatarFile || this.form.avatar)
        || !(this.frontFile || this.form.docsfront)
        || !(this.backFile || this.form.docsback)
      ) {
        this.$notify({
          type: 'error',
          text: 'Заполните форму'
        });
        return;
      }
      if (this.form.inn.length !== 12) {
        this.$notify({
          type: 'warn',
          text: 'ИИН заполнен неверно'
        });
        return;
      }
      this.isLoading = true;

      try {
        const data = {
          ...this.form,
          carModel: this.selectedCarType.key,
        }

        if (!this.isEdit) {
          data.phone = this.phoneNumber;
        }

        if (this.avatarFile) {
          const avaName = `${this.form.inn}_ava.${this.fileTypes[this.avatarFile.type]}`;
          await this.uploadAvatar(avaName);
          data.avatar = avaName;
        }
        if (this.frontFile) {
          const frontName = `${this.form.inn}_front.${this.fileTypes[this.frontFile.type]}`;
          await this.uploadFront(frontName);
          data.docsfront = frontName;
        }
        if (this.backFile) {
          const backName = `${this.form.inn}_back.${this.fileTypes[this.backFile.type]}`;
          await this.uploadBack(backName);
          data.docsback = backName;
        }

        if (this.isEdit) {
          const response = await editDriver(data);
          if (response.status === 200) {
            this.SAVE_DRIVER_INFO(response.data);

            await this.$router.replace('/driver-profile');
          }
        } else {
          const response = await createDriver(data);
          if (response.status === 201) {
            this.SAVE_DRIVER_INFO(response.data);

            await this.$router.replace('/driver-profile');
          }
        }
      } catch(e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.driver-edit {
  height: 100vh;
  overflow: auto;

  &__header {
    padding: 15px 12px 10px 12px;
  }

  &__sheet-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 24px 57px 24px;
    height: calc(100% - 44px);
  }

  &__inputs {
    margin-top: 16px;
  }

  &__input {
    &:not(:first-child) {
      margin-top: 12px;
    }
  }

  &__description {
    margin-top: 10px;

    &_bold {
      font-weight: 600;
    }
  }

  &__form-button {
    margin-top: 12px;
    width: 100%;
  }

  &__bottom-button {
    margin-top: 20px;
  }

  &__cars {
    display: flex;
    justify-content: space-between;
  }

  &__car-item {
    width: calc(100% / 3 - 14px);
  }

  &__trucks {
    margin-top: 20px;
  }

  &__truck-item {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  &__sheet-conent {
    padding: 20px 14px;
  }
}
.car-color-select {
  width: 100%;
  height: 1px;
  visibility: hidden;
  opacity: 0;
}

.color-select-block {
  position: relative;

  &__hero {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
  }
}
</style>
