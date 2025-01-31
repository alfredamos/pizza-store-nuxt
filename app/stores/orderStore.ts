import type { OrderModel } from "~~/models/orders/orderModel.model";
import { OrderState } from "~~/states/orderState";
import { defineStore } from "pinia";
import { orderBaseUrl } from "~~/constants/orderBaseUrl";
import { Status } from "@prisma/client";

export const useOrderStore = defineStore("order", () => {
  //----> Constants.
  const url = `${orderBaseUrl}`

  //----> State
  const orderState = ref<OrderState>({ ...new OrderState() });

  //----> Getters
  const stateOrder = computed(() => orderState.value);
  const orders = computed(() => stateOrder.value?.orders);
  const isDelivered = computed(() => stateOrder.value?.isDelivered);
  const isShipped = computed(() => stateOrder.value?.isShipped);

  //----> Actions
  const getOrdersFromDb = async(status: Status) => {
    const {data} = await useFetch<OrderModel[]>(url)
    const orders = data.value?.filter(ord => ord.status === status);
    return {orders}
  }

  //----> Update the order list with the new order.
  const addOrder = (order: OrderModel) => {
    const newOrders = [...orderState.value?.orders, order];
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  //----> The deleted order is removed from the order-list.
  const deleteOrder = (orderId: string) => {
    const newOrders = orderState.value?.orders?.filter(
      (order) => order.id !== orderId
    );
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  //----> One order is edited and inserted back to the order list.
  const editOrder = (orderPayload: OrderModel) => {
    const newOrders = orderState.value?.orders?.map((order) =>
      order.id === orderPayload?.id ? orderPayload : order
    );
    orderState.value = { ...orderState.value, orders: newOrders };

    setLocalStorageOrders(newOrders);
  };

  //----> Edited orders are inserted into the order-list
  const editAllOrders = (orders: OrderModel[]) => {
    orderState.value = { ...orderState.value, orders };

    setLocalStorageOrders(orders);
  };

  //----> Order is changed to deliver.
  const changeIsDelivered = (value: boolean) => {
    orderState.value = { ...orderState.value, isDelivered: value };
  };

  //----> Order is changed to shipped
  const changeIsShipped = (value: boolean) => {
    orderState.value = { ...orderState.value, isShipped: value };
  };

  //----> Order is changed to pending
  const changeIsPending = (value: boolean) => {
    orderState.value = { ...orderState.value, isPending: value };
  };

  //----> Get orders from local storage.
  const getLocalStorageOrders = (): OrderModel[] => {
    return JSON.parse(localStorage.getItem("orders")!) as OrderModel[];
  };

  //----> Remove order from local storage.
  const removeLocalstorageOrders = () => {
    localStorage.removeItem("orders");
  };

  //----> Set order in the local storage.
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
    getOrdersFromDb,
    setLocalStorageOrders,
    removeLocalstorageOrders,
  };
});
