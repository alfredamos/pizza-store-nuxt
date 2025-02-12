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
import Swal from "sweetalert2"

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
    console.log({loginDataInput})
    $fetch<AuthResponseModel>(url, {
    method: 'POST',
    body: loginDataInput
  })
  .then(async (data) => {
    console.log({authRes: data})
    authStore.loginWithoutAuth(data);
    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    const {isConfirmed} = await Swal.fire({
      icon: "success",
      title: "Login",
      text: "Login is successful!",
    });
    isConfirmed && navigateTo('/') ;
  })
  .catch((error: any) => {
    errorMessage.value = error?.statusMessage;
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage.value,
});
    
  }); 
    //----> Login the user in.
  }

</script>
