<template>
  <div class="user-edit">
    <div class="user-edit__header">
      <ArrowLeft @click="$router.go(-1)" />
    </div>

    <div class="user-edit__sheet-content">
      <div>
        <div class="title-big">
          {{ isEdit ? 'Изменение данных о клиенте' : 'Регистрация' }}
        </div>

        <div class="user-edit__description">
          Заполните данные ниже
        </div>

        <div class="user-edit__inputs">
          <VInput
            v-model="form.firstName"
            placeholder="Имя"
            class="user-edit__input"
          />
          <VInput
            v-model="form.lastName"
            placeholder="Фамилия"
            class="user-edit__input"
          />
          <input
            ref="ava-file-input"
            type="file"
            accept="image/png, image/jpeg"
            class="input-hidden"
            @change="inputAvatar"
          />
          <VButton
            textStart
            class="user-edit__form-button"
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
        </div>
      </div>

      <VButton 
        :disabled="isLoading"
        variant="yellow"
        class="user-edit__bottom-button"
        @click.native="onClickSave"
      >
        Продолжить
      </VButton>
    </div> 
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import VInput from '@/components/ui/VInput.vue';
import VButton from '@/components/ui/VButton.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

import { createUser, editUser, getUserProfile } from '@/api/user';
import { apiUploadAvatar } from '@/api/file';

export default {
  name: 'UserEdit',
  components: {
    VInput,
    VButton,
    ArrowLeft
  },

  data: () => ({
    isLoading: false,
    overlay: true,
    maxWidth: "660px",
    maxHeight: "100%",
    clickToClose: false,
    swipeAble: false,
    showPan: false,
    isFullScreen: true,
    overlayColorSelect: "#0000004D",
    backgroundScrollable: false,
    backgroundClickable: false,
    code: null,
    form: {
      phone: '',
      firstName: '',
      lastName: '',
      avatar: '',
    },
    fileTypes: {
      'image/png': 'png',
      'image/jpeg': 'jpeg',
      'image/jpg': 'jpg',
    },
    avatarFile: null,
  }),
  computed: {
    ...mapState('auth', [
      'phoneNumber',
    ]),
    ...mapState('user', [
      'userInfo',
    ]),

    isEdit() {
      return !!this.userInfo;
    },
  },

  async created() {
    if (this.isEdit) {
      const formKeys = Object.keys(this.form);
      formKeys.forEach(item => {
        this.form[item] = this.userInfo[item];
      })

      return;
    }

    if (!this.phoneNumber) {
      return await this.$router.replace('/login');
    }
  },

  methods: {
    ...mapMutations('user', [
      'SAVE_USER_INFO',
    ]),
    openInputAvatar() {
      this.$refs['ava-file-input'].click();
    },
    async inputAvatar(e) {
      const file = e.target.files[0];
      this.avatarFile = file;
    },
    async uploadAvatar(name) {
      try {
        await apiUploadAvatar(this.avatarFile, name)
      } catch(err) {
        console.error(err);
      }
    },
    async onClickSave() {
      if (
        !this.form.firstName
        || !this.form.lastName
        || !(this.avatarFile || this.form.avatar)
      ) {
        this.$notify({
          type: 'error',
          text: 'Заполните форму'
        });
        return;
      }
      this.isLoading = true;

      try {
        const data = {
          ...this.form,
        }
        if (!this.isEdit) {
          data.phone = this.phoneNumber;
        }
        if (this.avatarFile) {
          const avaName = `${data.phone}_ava.${this.fileTypes[this.avatarFile.type]}`;
          await this.uploadAvatar(avaName);
          data.avatar = avaName;
        }
        if (this.isEdit) {
          const response = await editUser(data);

          if (response) {
            const { data: userData } = await getUserProfile();
            this.SAVE_USER_INFO(userData);
            await this.$router.push('/user-main');
          }
        } else {
          const response = await createUser(data);

          if (response) {
            const { data: userData } = await getUserProfile();
            this.SAVE_USER_INFO(userData);
            await this.$router.push('/user-main');
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
.user-edit {
  height: 100vh;

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
}
</style>
