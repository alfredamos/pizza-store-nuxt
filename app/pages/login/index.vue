<template>
  <FormLogin
    :error-message="errorMessage"
    @on-back-to-list="backToList"
    @on-submit-form="submitLoginForm"
  />
</template>

<script setup lang="ts">
import { authBaseUrl } from '~~/constants/authBaseUrl';
import { LoginModel } from '~~/models/auth/login.model';
import { AuthResponseModel } from '~~/models/auth/authResponse.model';
import { loginSchema } from '~~/validations/auth.validation';

const errorMessage = ref("");

const {fetch: refreshSession} = useUserSession()

const url = `${authBaseUrl}/login`;

const authStore = useAuthStore();

const {validateDataSchema} = useValidateInputData()

  const router = useRouter()

  const backToList = () => {
    router.back();
  }

  const submitLoginForm = async (loginModel: LoginModel) => {
    console.log("loginModel : ", loginModel);
    const {data: loginDataInput} = validateDataSchema(loginSchema, loginModel);
    
    $fetch<AuthResponseModel>(url, {
    method: 'POST',
    body: loginDataInput
  })
  .then(async (data) => {
    authStore.loginWithoutAuth(data);
    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    await navigateTo('/');
  })
  .catch((error: any) => {
    errorMessage.value = error?.message;
  }); 
    //----> Login the user in.
    
    
    router.push("/")
  }

</script>
