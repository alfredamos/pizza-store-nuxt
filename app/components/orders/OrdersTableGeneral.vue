+<template>
  <div
    v-if="!props?.orders?.length"
    class="flex flex-col justify-between items-end mx-auto my-auto bg-white text-black max-w-lg px-12 py-40 rounded-lg shadow-lg mt-24"
  >
    <h1 class="text-3xl">There are no orders to display!</h1>
    <span class="mt-32 text-indigo-900 font-bold hover:text-rose-900"
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
          <th v-if="props?.isShowAction">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-base text-black"
          v-for="order of props?.orders"
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
          <td v-if="props?.isShowHandlers">
            <button
              v-if="props?.isDelivered"
              :disabled="order.isDelivered || !order.isShipped"
              type="button"
              class="py-2 px-4 border-2 border-green-900 hover:bg-green-900 hover:text-green-100 text-green-900 font-bold text-base rounded-lg m-2"
              @click="$emit('onDeliveredOrder', order.id)"
            >
              Delivered
            </button>
            <button
              v-if="props?.isDeleted"
              :disabled="order.isShipped || order.isDelivered"
              type="button"
              class="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-indigo-100 text-rose-900 font-bold text-base rounded-lg m-2"
              @click="$emit('onDeleteOrder', order.id)"
            >
              Delete
            </button>
            <button
              v-if="props?.isShipped"
              :disabled="order.isShipped"
              type="button"
              class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-indigo-100 text-indigo-900 font-bold text-base rounded-lg m-2"
              @click="$emit('onShippedOrder', order.id)"
            >
              Shipped
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { RouterLink } from "vue-router";
import type { OrderModel } from "~~/models/orders/orderModel.model";

  
const props = defineProps({
   orders: {
        type: Object as PropType<OrderModel[]>,
        required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    isDelivered: {
      type: Boolean,
      required: false,
      default: false
    },
    isShipped: {
      type: Boolean,
      required: false,
      default: false
    },
    isShowAction: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowHandlers: {
      type: Boolean,
      required: false,
      default: true
    }
    
});

const emit = defineEmits(['onDeleteOrder', 'onDeliveredOrder', 'onShippedOrder'])
</script>