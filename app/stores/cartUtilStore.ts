//import { defineStore } from "pinia";
import type { Pizza} from "~~/models/pizzas/pizza.model";
import type { CartItem } from "~~/models/cartItems/cartItem.model";
import { v4 as uuidv4 } from "uuid";
import type { OrderPayload } from "~~/models/orders/orderPayload.model";
import {defineStore} from "pinia";

export const useCartUtilStore = defineStore("cartUtil", () => {
  const cartItemStore = useCartItemStore();

  const makeCartItems = (pizza: Pizza, carts: CartItem[]) =>{
    const cart = findCartItem(pizza, carts)!;

    let cartItem: CartItem | undefined;
    let allCartItems: CartItem[] = [];
    let cartItems: CartItem[] = [...carts];

    if (cart?.quantity > 0) {
      let quantity = Number(cart.quantity);
      cartItem = { ...cart, quantity: quantity + 1 };
      const newCartItems = cartItems?.filter((carte) =>
        carte?.id !== cart?.id ? cartItem : carte
      );
      cartItemStore.editCartItem(cartItem);

      allCartItems = [...newCartItems, cartItem];

      return { cartItems: allCartItems };
    } else if (!cart) {
      cartItem = {
        id: uuidv4(),
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        pizzaId: pizza.id,
        orderId: "",
        image: pizza.image,
      };

      cartItemStore.addCartItem(cartItem);

      allCartItems = [...cartItems, cartItem];
    }

    return { cartItems: allCartItems };
  }

  const findCartItem =(pizza: Pizza, carts: CartItem[]) =>{
    return carts?.find((cartItem) => cartItem?.pizzaId === pizza.id);
  }

  const backToPizza=() =>{
    cartItemStore.changeIsAddToCart(false);
  }

  const makeOrder =(userId: string,carts: CartItem[]): OrderPayload =>{
      const orderPayload: OrderPayload = {
        id: uuidv4(),
        paymentId: '',
        cartItems: carts,
        totalPrice: totalPrice(carts),
        totalQuantity: totalQuantity(carts),
        userId: userId,
        orderDate: new Date(),
      };

      return orderPayload;
  }

  const quantityIncrease=(cart: CartItem) =>{
    console.log("Quantity is increased");
    const newCart = {
      ...cart,
      quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
    };

    cartItemStore.editCartItem(newCart);
  }

  const quantityDecrease =(cart: CartItem) =>{
    console.log("Quantity is decreased");

    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0) cartItemStore.deleteCartItem(cart.id);

    if (cart?.quantity > 0) cartItemStore.editCartItem(newCart);
  }

  const removeCartItem = (cartId: string, carts: CartItem[]) => {
    const newCartItems = carts?.filter((cart) => {
      if (cart.id === cartId) {
        cartItemStore.deleteCartItem(cart.id);
        return;
      }

      return cart;
    });

    cartItemStore.editAllCatItems(newCartItems);
  }

  const totalPrice = (carts: CartItem[]) => {
    return carts?.reduce((sum, current) => sum + current.quantity * current.price ,0)
  }

  const totalQuantity = (carts: CartItem[]) => {
    return carts?.reduce((sum, current) => sum + current.quantity ,0)
  }



  return {
    backToPizza,
    makeCartItems,
    makeOrder,
    quantityDecrease,
    quantityIncrease,
    removeCartItem,
  };
});
