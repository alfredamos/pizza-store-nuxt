<template>
  <UserDeleteDialog
    v-if="isDeleteUser"
    :isDelete="isDeleteUser"
    :user="user"
    @onBackToList="backToList"
    @onDelete="deleteUser"
  /> 
  <UserViewDialog
    v-if="isViewUser"
    :isView="isViewUser"
    :user="user"
    @onBackToList="backToList()"
  />

  <div class="flex items-center w-full mt-2">
    <button
      type="button"
      class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 text-indigo-900 font-bold text-base rounded-lg mr-2"
      @click="userViewConfirmation"
    >
      view
    </button>
    <button
      type="button"
      class="py-2 px-4 border-2 border-red-900 hover:bg-red-900 hover:text-red-100 text-red-900 font-bold text-base rounded-lg mr-2"
      @click="userDeleteConfirmation"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { userBaseUrl } from '~~/constants/userBaseUrl';
import {UserPayload as User } from '~~/models/users/userPayload.model';

const props = defineProps({ 
  id: String,
  user: User 
});

const url = `${userBaseUrl}/${props?.id}/delete`

const {sentDataToDb} = useSentDataToDb<User>(url, 'delete');

console.log("In user-edit-dialog, id : ", props?.id);
const isDeleteUser = ref(false);
const isViewUser = ref(false);
const refresh = ref(false);

const emit = defineEmits(['onEdit', 'onDelete']);

const userDeleteConfirmation = () => {
  isDeleteUser.value = !isDeleteUser.value;
};

const userViewConfirmation = () => {
  console.log("In view, isView : ", isViewUser.value);
  isViewUser.value = !isViewUser.value;
};

const backToList = () => {
  console.log("At point 1", isDeleteUser.value);
  if (isDeleteUser.value) isDeleteUser.value = !isDeleteUser.value;
  if (isViewUser.value) isViewUser.value = !isViewUser.value;
};

const deleteUser = async () => {
  console.log("Please delete me now!!!");
  console.log("user info deleted : ", props?.id);

  const user = props?.user as User;
  user.id = props?.id ?? ""

  await sentDataToDb(user);

  emit('onDelete', props?.id);

  isDeleteUser.value = !isDeleteUser.value;

  refresh.value = !refresh.value;
};
</script>

