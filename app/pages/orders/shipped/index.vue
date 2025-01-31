<template>
  <OrdersTable
  :orders="allOrders"
  :show-action-buttons="true"
  :show-buttons="true"
  @delivered="onDeliveredOrder($event)"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders" class="flex 1 text-indigo-900">All Orders</NuxtLink>
    <NuxtLink to="/orders/delivered" class="flex 1 text-green-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/pending" class="flex 1 text-red-900">Pending Orders</NuxtLink>
    </div>
  </OrdersTable>
</template>

<script lang="ts" setup>
import { Status } from '@prisma/client';
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';


const {fetchApp: fetchAppPatch} = useFetchApp<OrderModel>('PATCH');

const orderStore = useOrderStore();

const {orders} = await orderStore.getOrdersFromDb(Status.Shipped);

const allOrders = ref<OrderModel[]>([]);

onMounted(() => {
   allOrders.value= orders!;
});


const onDeliveredOrder = async (orderId: string) => {
  console.log("is-delivered");
  const urlDelivered = `${orderBaseUrl}/${orderId}/delivered`;
  const {data: updatedOrder} = await fetchAppPatch(urlDelivered, {} as OrderModel)

  allOrders.value = [
    ...allOrders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord.status === Status.Shipped)
       ?.filter((ord) => ord.status !== Status.Pending)
      ,
  ];

  orderStore.editOrder(updatedOrder);
};
</script>

<style lang="scss" scoped></style>
