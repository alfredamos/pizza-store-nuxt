<template>
<OrdersTable
  :orders="allOrders"
  :show-action-buttons="true"
  :show-buttons="true"
  @delete="onDeleteOrder($event)"
  @shipped="onShippedOrder($event)"
  >
   <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders" class="flex 1 text-indigo-900">All Orders</NuxtLink>
    <NuxtLink to="/orders/delivered" class="flex 1 text-green-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/shipped" class="flex 1 text-yellow-700">Shipped Orders</NuxtLink>
    </div>
</OrdersTable>
</template>

<script lang="ts" setup>
import { Status } from '@prisma/client';
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';
import type { OrderPayload } from '~~/models/orders/orderPayload.model';
//import { OrdersTable } from '#components';

const {fetchApp: fetchAppPatch} = useFetchApp<OrderPayload>('PATCH');
const  {fetchApp: fetchAppDelete} = useFetchApp<OrderPayload>('delete');

const orderStore = useOrderStore();

const {orders} = await orderStore.getOrdersFromDb(Status.Pending)

const allOrders = ref<OrderModel[]>([]);

onMounted(() => {
  allOrders.value = orders!;
});

const onShippedOrder = async (orderId: string) => {
  const urlShipped = `${orderBaseUrl}/${orderId}/shipped`;

  const {data: updatedOrder} = await fetchAppPatch(urlShipped, {} as OrderPayload);
  allOrders.value = [
    ...allOrders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord?.status === Status.Pending),
  ];

  orderStore.editOrder(updatedOrder);
  orderStore.changeIsPending(false);
};

const onDeleteOrder = async (orderId: string) => {
  orderStore.deleteOrder(orderId);

  const urlDeleted = `${orderBaseUrl}/${orderId}/delete`
  
  await fetchAppDelete(urlDeleted, {} as OrderPayload);
  allOrders.value = [
    ...allOrders.value?.filter((order) => order.id !== orderId),
  ]?.filter((order) => order.status === Status.Pending);
};
</script>
