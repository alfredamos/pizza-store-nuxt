import type { OrderModel } from "~~/models/orders/orderModel.model";
import { OrderState } from "~~/states/orderState";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  //----> State
  const orderState = ref<OrderState>({ ...new OrderState() });

  //----> Getters
  const stateOrder = computed(() => orderState.value);
  const orders = computed(() => stateOrder.value?.orders);
  const isDelivered = computed(() => stateOrder.value?.isDelivered);
  const isShipped = computed(() => stateOrder.value?.isShipped);

  //----> Actions
  const addOrder = (order: OrderModel) => {
    const newOrders = [...orderState.value?.orders, order];
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  const deleteOrder = (orderId: string) => {
    const newOrders = orderState.value?.orders?.filter(
      (order) => order.id !== orderId
    );
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  const editOrder = (orderPayload: OrderModel) => {
    const newOrders = orderState.value?.orders?.map((order) =>
      order.id === orderPayload?.id ? orderPayload : order
    );
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  const editAllOrders = (orders: OrderModel[]) => {
    orderState.value = { ...orderState.value, orders };

    setLocalStorageOrders(orders);
  };

  const changeIsDelivered = (value: boolean) => {
    orderState.value = { ...orderState.value, isDelivered: value };
  };

  const changeIsShipped = (value: boolean) => {
    orderState.value = { ...orderState.value, isShipped: value };
  };

  const changeIsPending = (value: boolean) => {
    orderState.value = { ...orderState.value, isPending: value };
  };

  const getLocalStorageOrders = (): OrderModel[] => {
    return JSON.parse(localStorage.getItem("orders")!) as OrderModel[];
  };

  const removeLocalstorageOrders = () => {
    localStorage.removeItem("orders");
  };

  const setLocalStorageOrders = (orders: OrderModel[]) => {
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  return {
    addOrder,
    deleteOrder,
    editAllOrders,
    editOrder,
    isDelivered,
    isShipped,
    changeIsDelivered,
    changeIsPending,
    changeIsShipped,
    stateOrder,
    orders,
    getLocalStorageOrders,
    setLocalStorageOrders,
    removeLocalstorageOrders,
  };
});
