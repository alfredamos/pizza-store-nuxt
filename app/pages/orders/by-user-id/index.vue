<template>
  <OrdersTable
  :orders="orders ?? []"
  :show-action-buttons="false"
  :show-buttons="false"
  >
  </OrdersTable>
</template>

<script lang="ts" setup>
import { orderBaseUrl } from "~~/constants/orderBaseUrl";
import type { OrderModel } from "~~/models/orders/orderModel.model";

definePageMeta({
  middleware: ["authenticated"]
})

const authStore = useAuthStore();
const { userId} = storeToRefs(authStore);

const url = `${orderBaseUrl}/${userId.value}`

const {data: orders} = await useFetch<OrderModel[]>(url);
</script>

