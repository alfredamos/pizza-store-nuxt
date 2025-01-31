<template>
  <OrdersTable
  :orders="allOrders!"
  :show-action-buttons="false"
  :show-buttons="false"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders/delivered" class="flex 1 text-green-900">Delivered Orders</NuxtLink>
    <NuxtLink to="/orders/shipped" class="flex 1 text-yellow-700">Shipped Orders</NuxtLink>
    <NuxtLink to="/orders/pending" class="flex 1 text-red-900">Pending Orders</NuxtLink>
    </div>
  </OrdersTable>
</template>

<script lang="ts" setup>
import { orderBaseUrl } from '~~/constants/orderBaseUrl';
import type { OrderModel } from '~~/models/orders/orderModel.model';

const url = `${orderBaseUrl}` 

const {data: allOrders} = await useFetch<OrderModel[]>(url);

</script>

