<template>
 <FormChangePassword
 @on-back-to-list="backToList"
 @on-submit-form="submitChangePasswordForm"
 :current-user="currentUser"
 />
</template>

<script lang="ts" setup>
import { authBaseUrl } from '~~/constants/authBaseUrl';
import { AuthResponseModel } from '~~/models/auth/authResponse.model';
import type { ChangePasswordModel } from '~~/models/auth/changePassword.model';

definePageMeta({
  auth: true
})

const url = `${authBaseUrl}/change-password`;

const {currentUser} = useAuthStore()
const {sentDataToDb} = useForwardDataToDb<ChangePasswordModel,AuthResponseModel>(url, 'patch');

  const router = useRouter()

  const backToList = () => {
    router.back();
  }

  const submitChangePasswordForm = async (changePasswordModel: ChangePasswordModel) => {
    console.log("change-password : ", changePasswordModel);

    await sentDataToDb(changePasswordModel);

    router.push("/")
  }

</script>
