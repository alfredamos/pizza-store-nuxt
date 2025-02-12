<template>
  <FormSignup 
  :error-message="errorMessage"
  @on-back-to-list="backToList" 
  @on-submit-form="submitForm" />
</template>

<script lang="ts" setup>
import { authBaseUrl } from '~~/constants/authBaseUrl';
import type { AuthResponseModel } from '~~/models/auth/authResponse.model';
import type { SignupModel } from '~~/models/auth/signup.model';
import { signupSchema } from '~~/validations/auth.validation';

const errorMessage = ref("");

const {fetch: refreshSession} = useUserSession()

const url = `${authBaseUrl}/signup`;

const {validateDataSchema} = useValidateInputData()

const backToList = () => {
  navigateTo("/");
};

const submitForm = async (signupModel: SignupModel) => {
  console.log("signupModel : ", signupModel);

  const {data: signupInputData} = validateDataSchema(signupSchema, signupModel)

  $fetch<AuthResponseModel>(url, {
    method: 'POST',
    body: signupInputData
  })
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    await navigateTo('/login');
  })
  .catch((error: any) => {
    errorMessage.value = error?.statusMessage;
  });

};
</script>

