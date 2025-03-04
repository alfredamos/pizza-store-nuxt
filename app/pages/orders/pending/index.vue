<template>
<OrdersTableGeneral
    :orders="allOrders!"
    :is-deleted="true"
    :is-shipped="true"
    @on-delete-order="onDeleteOrder"
    @on-shipped-order="onShippedOrder"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders" class="flex 1 text-indigo-900">All Orders</NuxtLink>
    <NuxtLink to="/orders/delivered" class="flex 1 text-green-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/shipped" class="flex 1 text-red-900">Shipped Orders</NuxtLink>
    </div>
  </OrdersTableGeneral>
</template>

<script lang="ts" setup>
import { Status} from '@prisma/client';
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';
import { useFetchApp } from '../../../composables/useFetchApp';

definePageMeta({
  middleware: ["authenticated", "admin"]
})

//----> Fetch orders.
const {getResource} = useGetResource<OrderModel[]>(orderBaseUrl, 'GET')

//----> Patch and delete order
const {fetchApp: fetchAppPatch} = useFetchApp<OrderModel>('PATCH');
const  {fetchApp: fetchAppDelete} = useFetchApp<OrderModel>('delete');

//----> Stores
const orderStore = useOrderStore();

//----> State
const allOrders = ref<OrderModel[]>([]);
const refresh = ref(false);

//----> Life cycle.
onMounted(async() => {
  await onLoad()
})

//----> Actions
const onLoad = async () => {
  const {data: orders} = await getResource();
  allOrders.value = orders?.filter(order => order.status === Status.Pending);

  orderStore.editAllOrders(orders);
}

const onShippedOrder = async (orderId: string) => {
  console.log("is-shipped");
  orderStore.changeIsPending(false);

  //----> Updated the order in the database.
  const {data: updatedOrder} = await fetchAppPatch(`${orderBaseUrl}/${orderId}/shipped`);
  
  //----> Filter for pending orders.
  allOrders.value = [
    ...allOrders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord.status === Status.Pending)
      
  ];
  //----> Refresh
  refresh.value = true
  //----> Update order-store
  orderStore.editOrder(updatedOrder!);
  //----> Refresh to default.
  refresh.value = false;
};

const onDeleteOrder = async (orderId: string) => {
  console.log("order-is-deleted");
  await fetchAppDelete(`${orderBaseUrl}/${orderId}/delete`);

  allOrders.value?.filter(order => order.id !== orderId)
  allOrders.value?.filter((order) => order.status === Status.Pending);

   orderStore.deleteOrder(orderId);
}
</script>
