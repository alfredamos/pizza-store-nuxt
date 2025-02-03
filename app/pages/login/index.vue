<template>
  <FormLogin
    @on-back-to-list="backToList"
    @on-submit-form="submitLoginForm"
  />
</template>

<script setup lang="ts">
import { authBaseUrl } from '~~/constants/authBaseUrl';
import { LoginModel } from '~~/models/auth/login.model';
import { AuthResponseModel } from '~~/models/auth/authResponse.model';
import { loginSchema } from '~~/validations/auth.validation';

const url = `${authBaseUrl}/login`;

const authStore = useAuthStore();
const {sentDataToDb} = useForwardDataToDb<LoginModel, AuthResponseModel>(url, 'post');
const {validateDataSchema} = useValidateInputData()

  const router = useRouter()

  const backToList = () => {
    router.back();
  }

  const submitLoginForm = async (loginModel: LoginModel) => {
    console.log("loginModel : ", loginModel);
    const {data} = validateDataSchema(loginSchema, loginModel);
    const {data: authResponse} = await sentDataToDb(loginModel);
    //----> Login the user in.
    console.log("In login page, response : ", authResponse)
    authStore.loginWithoutAuth(authResponse);
    
    router.push("/")
  }

</script>
