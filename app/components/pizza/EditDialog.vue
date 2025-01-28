<template>
  <ModalAlert :is-add-to-cart="props?.isEdit">
    <PizzaEditCard
      form-name="Edit"
      :pizza="props?.pizza"
      @click="$event.stopPropagation()"
      @on-cancel="backToList"
      @on-edit="editPizza"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';


const emit = defineEmits(["onBackToList", "onEdit"]);
const props = defineProps<{ isEdit: boolean; pizza: Pizza }>();

const backToList = () => {
  emit("onBackToList");
};

const editPizza = (pizza: Pizza) => {
  emit("onEdit", pizza);
};
</script>
