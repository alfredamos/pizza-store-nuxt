<template>
  <FormEditProfile
  :current-user="currentUser"
  @on-back-to-list="backToList"
  @on-submit-form="submitForm"
  />
</template>

<script lang="ts" setup>
import type { EditProfileModel } from '~~/models/auth/editProfile.model';

const authStore = useAuthStore();
const router = useRouter();

const currentUser = authStore.currentUser

const backToList = () => {
  router.back();
}

const submitForm = async (editProfileModel: EditProfileModel) => {
  //await authDbService.editProfile(editProfileModel);

  router.push("/")
}

</script>
