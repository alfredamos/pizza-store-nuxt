<template>
  <FormPizza
    :form-name="props?.formName"
    :pizza="props?.pizza"
    @on-cancel="backToList"
    @submit="editPizza"
  />
</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';


const props = defineProps<{formName: string; pizza: Pizza}>();
const emit = defineEmits(['onCancel', 'onEdit']);


const backToList = () =>{
    emit('onCancel');
  }

const editPizza =(pizza: Pizza) =>{
    emit('onEdit', pizza);
  }
</script>

