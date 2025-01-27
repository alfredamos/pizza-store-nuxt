import type { OrderModel } from "~~/models/orders/orderModel.model";

export class OrderState {
  orders: OrderModel[] = [];
  isDelivered: boolean = false;
  isShipped: boolean = false;
  isPending: boolean = true;
}

