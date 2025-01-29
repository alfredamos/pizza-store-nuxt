<template>
  <div
    v-if="!allOrders.length"
    class="flex flex-col justify-between items-end mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24"
  >
    <h1 class="text-3xl">There are no orders to display!</h1>
    <span class="mt-32 text-indigo-900"
      ><RouterLink to="/">Go Home</RouterLink></span
    >
  </div>
  <div
    class="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3"
    v-else
  >
    <table class="table table-zebra border-1 border-gray-200 p-3">
      <thead class="text-gray-200 text-xl bg-gray-500">
        <tr class="">
          <th>Order No.</th>
          <th>Items</th>
          <th>Price</th>
          <th>Quantities</th>
          <th>Date Order</th>
          <th>Status</th>
          <th>Order By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-base text-black"
          v-for="order in allOrders"
          :key="order.id"
        >
          <td class="truncate hover:whitespace-normal">{{ order.id }}</td>

          <td class="truncate hover:whitespace-normal">
            <ul v-for="item in order?.cartItems" :key="item.id">
              <li>
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </td>

          <td>${{ order.totalPrice }}</td>
          <td>{{ order.totalQuantity }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.user?.name }}</td>
          <td>
            <button
              :disabled="order.isDelivered"
              type="button"
              class="py-2 px-4 border-2 border-green-900 hover:bg-green-900 hover:text-green-100 text-green-900 font-bold text-base rounded-lg m-2"
              @click="onDeliveredOrder(order.id)"
            >
              Delivered
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { Status } from '@prisma/client';
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';
import type { OrderPayload } from '~~/models/orders/orderPayload.model';


const url = `${orderBaseUrl}`;

const {fetchApp: fetchAppPatch} = useFetchApp<OrderPayload>('PATCH');
const  {fetchApp: fetchAppDelete} = useFetchApp<OrderPayload>('delete');

const {getResource} = useGetResource<OrderPayload[]>(url, 'get');


const orderStore = useOrderStore();
const { orders } = storeToRefs(orderStore);

const allOrders = ref<OrderModel[]>([]);

onMounted(() => {
  loadOrder();
});

const loadOrder = async () => {
  const {data: orders} = await getResource();
  orders?.filter(
    (order) => order.status === Status.Shipped
  );
  console.log({ orders });
  orderStore.changeIsPending(false);
  orderStore.editAllOrders(orders);
  allOrders.value = [...orders];
};

const onDeliveredOrder = async (orderId: string) => {
  console.log("is-delivered");
  const urlDelivered = `${orderBaseUrl}/${orderId}/delivered`;
  const {data: updatedOrder} = await fetchAppPatch(urlDelivered, {} as OrderPayload)

  allOrders.value = [
    ...orders.value
      ?.map((order) => (order.id === orderId ? updatedOrder : order))
      ?.filter((ord) => ord.status === Status.Shipped),
  ];

  orderStore.editOrder(updatedOrder);
};
</script>

<style lang="scss" scoped></style>
