<template>
  <div
  class="bg-slate-100 max-w-lg shadow-2xl flex flex-col gap-2 rounded-2xl overflow-hidden items-center justify-center"
>
  <div class="flex 1 w-full h-full">
    <img
      :src="props?.user?.image"
      :alt="props?.user?.name"
      width="200"
      height="200"
      class="object-cover w-full h-72"
    />
  </div>
  <div class="flex 1 p-10">
    <div class="flex flex-col">
      <h2 class="card-title">
        <RouterLink to="/users">{{ props?.user?.name }}</RouterLink>
      </h2>
      <p class="flex justify-between items-center">
        <span class="font-light">Email</span>
        <span class="font-semibold">{{ props?.user?.email }}</span>
      </p>
      <p class="flex justify-between items-center">
        <span class="font-light">Phone</span>
        <span class="font-semibold">{{ props?.user?.phone }}</span>
      </p>
      <p class="flex justify-between items-center">
        <span class="font-light mr-5">Address</span>
        <span class="font-semibold text-wrap">{{ props?.user?.address }}</span>
      </p>
      <p class="flex justify-between items-center">
        <span class="font-light">Gender</span>
        <span class="font-semibold">{{ props?.user?.gender }}</span>
      </p>
      <div class="flex justify-center items-center mt-4 w-full">
        <button
          class="btn btn-primary font-bold uppercase w-full"
          type="button"
          @click="backToList"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</div>

</template>

<script lang="ts" setup>
import { UserPayload as User } from '~~/models/users/userPayload.model';

const emit = defineEmits(['onCancel'])
const props = defineProps<{user: User}>();

const backToList = () =>{
    emit('onCancel');
  }
</script>

