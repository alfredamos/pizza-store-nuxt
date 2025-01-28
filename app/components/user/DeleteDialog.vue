<template>
  <ModalAlert :is-add-to-cart="props?.isDelete">
    <userDeleteCard
      @click="$event.stopPropagation()"
      :user="props?.user"
      @on-back-to-list="backToList"
      @on-delete="deleteUser()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import { UserPayload as User } from '~~/models/users/userPayload.model';

const emit = defineEmits(["onBackToList", "onDelete"]);
const props = defineProps<{ isDelete: boolean; user: User }>();

const backToList = () => {
  emit("onBackToList");
};

const deleteUser = () => {
  emit("onDelete");
};
</script>

