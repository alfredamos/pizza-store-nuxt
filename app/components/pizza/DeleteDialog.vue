<template>
  <ModalAlert :is-add-to-cart="props?.isDelete">
    <PizzaDeleteCard
      @click="$event.stopPropagation()"
      :pizza="props?.pizza"
      @on-back-to-list="backToList"
      @on-delete="deletePizza()"
    />
  </ModalAlert>
</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';


const emit = defineEmits(["onBackToList", "onDelete"]);
const props = defineProps<{ isDelete: boolean; pizza: Pizza }>();

const backToList = () => {
  emit("onBackToList");
};

const deletePizza = () => {
  emit("onDelete");
};
</script>
