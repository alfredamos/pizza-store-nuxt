<template>
  <PizzaDeleteDialog
    v-if="isDeletePizza"
    :isDelete="isDeletePizza"
    :pizza="pizza"
    @onBackToList="backToList"
    @onDelete="deletePizza"
  />
  <PizzaEditDialog
    v-if="isEditPizza"
    :isEdit="isEditPizza"
    :pizza="pizza"
    @onBackToList="backToList"
    @onEdit="editPizza"
  />
  <PizzaViewDialog
    v-if="isViewPizza"
    :isView="isViewPizza"
    :pizza="pizza"
    @onBackToList="backToList()"
  />

  <div class="flex items-center w-full mt-2">
    <button
      type="button"
      class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 text-indigo-900 font-bold text-base rounded-lg mr-2"
      @click="pizzaViewConfirmation"
    >
      view
    </button>
    <button
      type="button"
      class="py-2 px-4 border-2 border-amber-500 hover:bg-amber-500 hover:text-amber-100 text-amber-500 font-bold text-base rounded-lg mr-2"
      @click="pizzaEditConfirmation"
    >
      Edit
    </button>
    <button
      type="button"
      class="py-2 px-4 border-2 border-red-900 hover:bg-red-900 hover:text-red-100 text-red-900 font-bold text-base rounded-lg mr-2"
      @click="pizzaDeleteConfirmation"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Pizza } from '@prisma/client';
import { pizzaBaseUrl } from '~~/constants/pizzaBaseUrl';


const props = defineProps<{ id: string; pizza: Pizza }>();
console.log("In pizza-edit-dialog, id : ", props?.id);
const isDeletePizza = ref(false);
const isEditPizza = ref(false);
const isViewPizza = ref(false);
const refresh = ref(false);

const urlEdit = `${pizzaBaseUrl}/${props?.id}/edit`
const urlDelete = `${pizzaBaseUrl}/${props?.id}/remove`

const emit = defineEmits(['onEdit', 'onDelete']);

const authStore = useAuthStore();

const { userId: idOfUser } = storeToRefs(authStore);

const {sentDataToDb: removePizza} = useSentDataToDb<Pizza>(urlDelete, 'delete')
const {sentDataToDb: updatePizza} = useSentDataToDb<Pizza>(urlEdit, 'patch')

const userId = idOfUser.value;

const pizzaDeleteConfirmation = () => {
  isDeletePizza.value = !isDeletePizza.value;
};

const pizzaEditConfirmation = () => {
  isEditPizza.value = !isEditPizza.value;
};

const pizzaViewConfirmation = () => {
  console.log("In view, isView : ", isViewPizza.value);
  isViewPizza.value = !isViewPizza.value;
};

const editPizza = async (pizza: Pizza) => {
  console.log("Please edit me now!!! => id : ", props?.id);
  pizza.userId = userId;
  pizza.id = props?.id;
  console.log("pizza info edited : ", pizza);

  const { data: updatedPizza } = await updatePizza(pizza);

  emit('onEdit', updatedPizza)

  isEditPizza.value = !isEditPizza.value;

  refresh.value = !refresh.value;
};

const backToList = () => {
  console.log("At point 1", isDeletePizza.value);
  if (isDeletePizza.value) isDeletePizza.value = !isDeletePizza.value;
  if (isEditPizza.value) isEditPizza.value = !isEditPizza.value;
  if (isViewPizza.value) isViewPizza.value = !isViewPizza.value;
};

const deletePizza = async () => {
  console.log("Please delete me now!!!");
  console.log("pizza info deleted : ", props?.id);

  const pizza = props?.pizza;
  pizza.userId = userId;
  pizza.id = props?.id;

  await removePizza(pizza);

  emit('onDelete', props?.id);

  isDeletePizza.value = !isDeletePizza.value;

  refresh.value = !refresh.value;
};
</script>
