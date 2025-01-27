<template>
  <form
    @submit.prevent="submitForm"
    class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
  >
    <h4 class="font-bold text-slate-800 text-2xl mb-6">Login Form</h4>
    <div class="mb-6 w-full px-10">
      <label
        for="email"
        class="flex flex-start w-full font-semibold tracking-wide"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="loginForm.email"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-12 w-full px-10">
      <label for="password" class="flex flex-start w-full font-semibold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="loginForm.password"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="flex px-10 mb-6 w-full gap-4">
      <button
        type="submit"
        class="flex-1 py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg"
      >
        Submit
      </button>
      <button
        type="button"
        class="flex-1 py-2 px-4 border-2 border-yellow-900 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold text-lg rounded-lg"
        @click="backToList"
      >
        Cancel
      </button>
    </div>
   <div class="text-muted">
    <NuxtLink to="/signup"><span class="mr-2">Don't have an account?</span><span class="text-indigo-900">Please signup</span></NuxtLink>
   </div> 
  </form>
  
</template>

<script lang="ts" setup>
import { LoginModel } from "../../../models/auth/login.model";
const loginForm = ref<LoginModel>({ ...new LoginModel() });

const emit = defineEmits(["onBackToList", "onSubmitForm"]);

const backToList = () => {
  emit("onBackToList");
};

const submitForm = () => {
  emit("onSubmitForm", loginForm.value);
};
</script>
