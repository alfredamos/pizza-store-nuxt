import type { CartItem } from "~~/models/cartItems/cartItem.model";

export class CartItemState{
  cartItems: CartItem[] = [];
  isAddToCart: boolean = false;
}