<template>
  <form
    class="bg-white text-slate-800 max-w-lg flex flex-col justify-center items-center mx-auto rounded-xl shadow-2xl py-10 mt-10"
    @submit.prevent="submitForm"
  >
    <h4 class="font-bold text-slate-800 text-2xl mb-6">Edit profile Form</h4>
    <div class="flex w-full px-10 gap-4">
    <div class="flex-1 mb-">
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
        v-model="editProfileForm.name"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="flex-1 mb-6">
      <label for="email" class="flex flex-start w-full font-semibold">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="editProfileForm.email"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    </div>
    <div class="flex w-full gap-4 px-10">
    <div class="flex-1 mb-4">
      <label for="phone" class="flex flex-start w-full font-semibold">
        Phone
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        v-model="editProfileForm.phone"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="flex-1 mb-4">
      <label for="image" class="flex flex-start w-full font-semibold">
        Image
      </label>
      <input
        id="image"
        name="image"
        type="text"
        v-model="editProfileForm.image"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    </div>
    <div class="flex w-full gap-4 px-10">
    <div class="flex-1 mb-4">
      <label for="password" class="flex flex-start w-full font-semibold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="editProfileForm.password"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      />
    </div>
    <div class="flex-1 mb-4">
      <label for="gender" class="flex flex-start w-full font-semibold">
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        v-model="editProfileForm.gender"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      >
        <option>Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </div>
    </div>
    <div class="mb-8 w-full px-10">
      <label for="address" class="flex flex-start w-full font-semibold">
        Address
      </label>
      <textarea
        id="address"
        name="address"
        type="text"
        v-model="editProfileForm.address"
        class="border-solid border-2 border-gray-300 focus:border-indigo-600 focus:outline-none bg-slate-200 w-full p-2 rounded-lg text-black"
      ></textarea>
    </div>
    
    <div class="flex w-full gap-4 px-10">
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
  </form>
</template>

<script lang="ts" setup>
import { EditProfileModel } from "../../../models/auth/editProfile.model";
import type { UserResponseModel } from '../../../models/users/userResponse.model';
import {Gender} from "../../../models/gender.model"

const props = defineProps<{ currentUser: UserResponseModel }>();

const editProfileForm = ref<EditProfileModel>({
  ...new EditProfileModel(),
  name: props.currentUser?.name,
  email: props.currentUser?.email,
  phone: props.currentUser?.phone,
  address: props.currentUser?.address,
  image: props.currentUser?.image,
  gender: props.currentUser?.gender as Gender,
});

const emit = defineEmits(["onBackToList", "onSubmitForm"]);

const backToList = () => {
  emit("onBackToList");
};

const submitForm = () => {
  emit("onSubmitForm", editProfileForm.value);
};
</script>

