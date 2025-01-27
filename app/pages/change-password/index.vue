<template>
 <FormChangePassword
 @on-back-to-list="backToList"
 @on-submit-form="submitForm"
 :current-user="currentUser"
 />
</template>

<script lang="ts" setup>
import type { ChangePasswordModel } from '~~/models/auth/changePassword.model';


const authStore = useAuthStore();
const currentUser = authStore.currentUser;

const router = useRouter();

const backToList = () => {
  router.back()
}

const submitForm = async(changePasswordModel: ChangePasswordModel) => {
 

  // router.push("/");
}

</script>
