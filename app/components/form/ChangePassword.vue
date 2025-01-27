<template>
 <form
  class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
  @submit.prevent="submitForm"
>
  <h4 class="font-bold text-slate-800 text-2xl mb-6">Change Password Form</h4>
  <div class="mb-4 w-full px-10">
    <label for="email" class="flex flex-start w-full font-semibold tracking-wide">
      Email
    </label>
    <input
      id="email"
      name="email"
      type="email"
      v-model="changePasswordForm.email"
      class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
    />
  </div>
  <div class="mb-4 w-full px-10">
    <label for="oldPassword" class="flex flex-start w-full font-semibold">
      Old Password
    </label>
    <input
      id="oldPassword"
      name="oldPassword"
      type="password"
      v-model="changePasswordForm.oldPassword"
      class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
    />
  </div>
  <div class="mb-4 w-full px-10">
    <label for="newPassword" class="flex flex-start w-full font-semibold">
      New Password
    </label>
    <input
      id="newPassword"
      name="newPassword"
      type="password"
      v-model="changePasswordForm.newPassword"
      class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
    />
  </div>
  <div class="mb-8 w-full px-10">
    <label for="confirmPassword" class="flex flex-start w-full font-semibold">
      Confirm Password
    </label>
    <input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      v-model="changePasswordForm.confirmPassword"
      class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
    />
  </div>
  <div class="flex gap-4 w-full px-10">
    <button
      type="submit"
      class="flex-1 py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold text-lg rounded-lg"
    >
      Submit
    </button>
    <button
      type="button"
      class="flex-1 py-2 px-4 border-2 border-yellow-900 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold text-lg rounded-lg"
      @click="backToList()"
    >
      Cancel
    </button>
  </div>
</form>

</template>

<script lang="ts" setup>
import { ChangePasswordModel } from "../../../models/auth/changePassword.model";
import type { UserResponseModel } from '../../../models/users/userResponse.model';

 const prop = defineProps<{currentUser: UserResponseModel}>();
 const changePasswordForm = ref<ChangePasswordModel>({...new ChangePasswordModel(), email: prop.currentUser?.email});

 const emit = defineEmits(['onBackToList', 'onSubmitForm']);

 const backToList = () => {
  emit('onBackToList');
 }

 const submitForm = () => {
  emit('onSubmitForm', changePasswordForm.value);
 }
</script>

