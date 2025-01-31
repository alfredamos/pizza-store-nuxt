<template>
  <FormEditProfile
  :current-user="currentUser"
  @on-back-to-list="backToList"
  @on-submit-form="submitEditProfileForm"
  />
</template>

<script lang="ts" setup>
import { authBaseUrl } from '~~/constants/authBaseUrl';
import { AuthResponseModel } from '~~/models/auth/authResponse.model';
import type { EditProfileModel } from '~~/models/auth/editProfile.model';
import type { UserResponseModel } from '~~/models/users/userResponse.model';

const url = `${authBaseUrl}/edit-profile`;

const authStore = useAuthStore();
const {currentUser} = storeToRefs(authStore);
const {sentDataToDb} = useForwardDataToDb<EditProfileModel, UserResponseModel>(url, 'patch');

  const router = useRouter()

  const backToList = () => {
    router.back();
  }

  const submitEditProfileForm = async (editProfileModel: EditProfileModel) => {
    console.log("edit-profile : ", editProfileModel);

    const {data: userInfo} = await sentDataToDb(editProfileModel);

    authStore.updateUserInfo(userInfo)

    router.push("/")
  }

</script>
