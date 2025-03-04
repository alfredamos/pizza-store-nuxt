<template>
  <OrdersTableGeneral
     :orders="allOrders ?? []"
    :is-show-action="false"
    :is-show-handlers="false"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders/delivered" class="flex 1 text-indigo-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/shipped" class="flex 1 text-green-900">Shipped Orders</NuxtLink>
    <NuxtLink to="/orders/pending" class="flex 1 text-red-900">Pending Orders</NuxtLink>
    </div>
  </OrdersTableGeneral>
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

