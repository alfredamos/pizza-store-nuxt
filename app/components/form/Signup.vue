<template>
  <form
    class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-8 mt-6"
    @submit.prevent="submitForm"
  >
    <h4 class="font-bold text-slate-800 text-2xl mb-6">Signup Form</h4>
    <div class="flex w-full px-10 gap-4">
    <div class="mb-4 flex-1">
      <label
        for="name"
        class="flex flex-start w-full font-semibold tracking-wide"
      >
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        v-model="signupForm.name"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-4 flex-1">
      <label for="email" class="flex flex-start w-full font-semibold">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="signupForm.email"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    </div>
    <div class="flex w-full gap-4 px-10">
      <div class="mb-4 flex-1">
      <label for="phone" class="flex flex-start w-full font-semibold">
        Phone
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        v-model="signupForm.phone"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-4 flex-1">
      <label for="image" class="flex flex-start w-full font-semibold">
        Image
      </label>
      <input
        id="image"
        name="image"
        type="text"
        v-model="signupForm.image"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    
    </div>
    <div class="flex w-full gap-4 px-10">
      <div class="mb-4 flex-1">
      <label for="password" class="flex flex-start w-full font-semibold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="signupForm.password"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="mb-4 flex-1">
      <label for="confirmPassword" class="flex flex-start w-full font-semibold">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        v-model="signupForm.confirmPassword"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    
    </div>
    <div class="mb-4 w-full px-10">
      <label for="gender" class="flex flex-start w-full font-semibold">
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        v-model="signupForm.gender"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      >
        <option>Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </div>
    <div class="mb-8 w-full px-10">
      <label for="address" class="flex flex-start w-full font-semibold">
        Address
      </label>
      <textarea
        id="address"
        name="address"
        type="text"
        v-model="signupForm.address"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      ></textarea>
    </div>
    <div class="flex gap-4 w-full px-10 mb-6">
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
    <NuxtLink to="/login"><span class="mr-2">You have an account?</span><span class="text-indigo-900">Please login</span></NuxtLink>
   </div> 
  </form>
</template>

<script lang="ts" setup>
import { SignupModel } from "../../../models/auth/signup.model";


const signupForm = ref<SignupModel>({ ...new SignupModel() });

const emit = defineEmits(["onBackToList", "onSubmitForm"]);

const backToList = () => {
  emit("onBackToList");
};

const submitForm = () => {
  console.log("signup-in-form : ", signupForm.value)
  emit("onSubmitForm", signupForm.value);
};
</script>

<style lang="scss" scoped></style>
