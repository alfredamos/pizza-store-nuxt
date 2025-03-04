<template>
  <OrdersTableGeneral
    :orders="allOrders!"
    :is-delivered="true"
    @on-delivered-order="onDeliveredOrder"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders" class="flex 1 text-indigo-900">All Orders</NuxtLink>
    <NuxtLink to="/orders/delivered" class="flex 1 text-green-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/pending" class="flex 1 text-red-900">Pending Orders</NuxtLink>
    </div>
  </OrdersTableGeneral>
  
</template>

<script lang="ts" setup>
import { Status } from '@prisma/client';
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';

definePageMeta({
  middleware: ["authenticated", "admin"]
})

const {fetchApp: fetchAppPatch} = useFetchApp<OrderModel>('PATCH');

const orderStore = useOrderStore();

const {orders} = await orderStore.getOrdersFromDb(Status.Shipped);

//----> State
const allOrders = ref<OrderModel[]>([]);
const refresh = ref(false);

//----> Life cycle.
onMounted(() => {
   allOrders.value= orders!;
});

//----> Actions.
const onDeliveredOrder = async (orderId: string) => {
  console.log("is-delivered");
  const urlDelivered = `${orderBaseUrl}/${orderId}/delivered`;
  const {data: updatedOrder} = await fetchAppPatch(urlDelivered, {} as OrderModel)

  //----> Filter fo shipped-orders.
  allOrders.value = [
    ...allOrders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord.status === Status.Shipped)
      
  ];
//----> Refresh
  refresh.value = true
  //----> Update order-store
  orderStore.editOrder(updatedOrder!);
  //----> Refresh to default.
  refresh.value = false;
};
</script>

<style lang="scss" scoped></style>
