import { AuthState } from "./authState";
import { CartItemState } from "./cartItemState";
import { OrderState } from "./orderState";
import type { PizzaState } from "./pizzaState";
import { UserState } from "./userState";

export class AllState{
  auth!: AuthState;
  cart!: CartItemState;
  order!: OrderState;
  pizzaState!: PizzaState;
  user!: UserState

}