<template>
  <FormSignup @on-back-to-list="backToList" @on-submit-form="submitForm" />
</template>

<script lang="ts" setup>
import { authBaseUrl } from '~~/constants/authBaseUrl';
import type { SignupModel } from '~~/models/auth/signup.model';
const url = `${authBaseUrl}/signup`;

const {sentDataToDb} = useSentDataToDb<SignupModel>(url, 'post')

const backToList = () => {
  navigateTo("/");
};

const submitForm = async (signupModel: SignupModel) => {
  console.log("signupModel : ", signupModel);

   const {data: response} = await sentDataToDb(signupModel);

  console.log({signupResponse: response})

  navigateTo("/");
};
</script>

