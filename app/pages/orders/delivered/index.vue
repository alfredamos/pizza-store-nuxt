<template>
  <OrdersTable
  :orders="orders!"
  :show-action-buttons="false"
  :show-buttons="false"
  >
  <div class="flex justify-around w-full font-bold">
    <NuxtLink to="/orders" class="flex 1 text-indigo-900">All Orders</NuxtLink>
    <NuxtLink to="/orders/shipped" class="flex 1 text-yellow-700">Shipped Orders</NuxtLink>
    <NuxtLink to="/orders/pending" class="flex 1 text-red-900">Pending Orders</NuxtLink>
    </div>
</OrdersTable>

</template>

<script lang="ts" setup>
import { Status } from '@prisma/client';

definePageMeta({
  middleware: ["authenticated", "admin"]
})

const orderStore = useOrderStore();

const {orders} = await orderStore.getOrdersFromDb(Status.Delivered);

</script>

