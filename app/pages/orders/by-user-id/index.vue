<template>
  <OrdersTable
  :orders="orders!"
  :show-action-buttons="false"
  :show-buttons="false"
  >
  </OrdersTable>
</template>

<script lang="ts" setup>
import { orderBaseUrl } from "~~/constants/orderBaseUrl";
import type { OrderModel } from "~~/models/orders/orderModel.model";

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const userId = currentUser.value?.id as string;

const url = `${orderBaseUrl}/${userId}`

const {data: orders} = await useFetch<OrderModel[]>(url);
</script>

