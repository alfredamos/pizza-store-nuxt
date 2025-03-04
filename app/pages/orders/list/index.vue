<template>
  <OrdersTableGeneral
    :orders="allOrders!"
    :is-show-action="false"
    :is-show-handlers="false"
  />
</template>

<script lang="ts" setup>
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';

definePageMeta({
  middleware: ["authenticated", "admin"]
})

//----> state
const allOrders = ref<OrderModel[]>([]);

//----> Stores.
const orderStore = useOrderStore();

//----> Fetch orders.
const {getResource} = useGetResource<OrderModel[]>(orderBaseUrl, 'GET');

//----> Life cycle.
onMounted(async() => {
  await onLoad()
})

//----> Actions
const onLoad = async () => {
  const {data: orders} = await getResource();

  allOrders.value = orders;

   orderStore.editAllOrders(orders);
}
</script>

