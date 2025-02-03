<template>
  <FormSignup @on-back-to-list="backToList" @on-submit-form="submitForm" />
</template>

<script lang="ts" setup>
import { authBaseUrl } from '~~/constants/authBaseUrl';
import type { SignupModel } from '~~/models/auth/signup.model';
import { signupSchema } from '~~/validations/auth.validation';
const url = `${authBaseUrl}/signup`;

const {validateDataSchema} = useValidateInputData()
const {sentDataToDb} = useSentDataToDb<SignupModel>(url, 'post')

const backToList = () => {
  navigateTo("/");
};

const submitForm = async (signupModel: SignupModel) => {
  console.log("signupModel : ", signupModel);

  const {data: signupInputData} = validateDataSchema(signupSchema, signupModel)

   const {data: response} = await sentDataToDb(signupInputData);

  console.log({signupResponse: response})

  navigateTo("/");
};
</script>

