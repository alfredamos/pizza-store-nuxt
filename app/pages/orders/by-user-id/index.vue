<template>
  <OrdersTableGeneral
    :orders="orders!"
    :is-show-action="false"
    :is-show-handlers="false"
  />
</template>

<script lang="ts" setup>
import { orderBaseUrl } from "~~/constants/orderBaseUrl";
import type { OrderModel } from "~~/models/orders/orderModel.model";

definePageMeta({
  middleware: ["authenticated"]
})

const authStore = useAuthStore();
const { userId} = storeToRefs(authStore);
console.log("in-my-orders",{userId: userId.value})
const url = `${orderBaseUrl}/${userId.value}`
console.log("in-my-order, url : ", url)
const {data: orders} = await useFetch<OrderModel[]>(url);
</script>

 