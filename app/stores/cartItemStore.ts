import type { CartItem } from "~~/models/cartItems/cartItem.model";
import { CartItemState } from "~~/states/cartItemState";
import { defineStore } from "pinia";

export const useCartItemStore = defineStore('cartItem', () => {
  //----> State
  const cartItemState = ref<CartItemState>({ ...new CartItemState() });
  
  //----> Acts like a constructor
    onMounted(() => {
      const stateOfCartItem = getLocalStorageCartItems();
  
      if (!!stateOfCartItem) {
        cartItemState.value = { ...cartItemState.value, cartItems: stateOfCartItem };
      }
    });

  //----> Getters
  const stateCartItem = computed(() => cartItemState.value);
  const cartItems = computed(() => cartItemState.value?.cartItems);
  const isAddToCart = computed(() => cartItemState.value?.isAddToCart);
  const totalPrice = computed(() => {
      return cartItemState.value?.cartItems?.reduce(
        (sum, current) => sum + current.price * current.quantity,
        0
      );
  })

  const totalQuantity = computed(() => {
    return cartItemState.value?.cartItems?.reduce((sum, current) => sum + current.quantity, 0);
  })

  //----> Actions
  const addCartItem = (cart: CartItem) =>{
    const newCartItems = [...cartItemState.value?.cartItems, cart];
    
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}; 

    setLocalStorageCartItems(newCartItems);
  }

  const deleteCartItem = (cartId: string) =>{
    const newCartItems = cartItemState.value?.cartItems?.filter(
      (cart) => cart.id !== cartId
    );
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}

    setLocalStorageCartItems(newCartItems);
  }

  const editCartItem = (cart: CartItem) => {
    const newCartItems = cartItemState.value?.cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? cart : cartItem
    );
    cartItemState.value = {...cartItemState.value, cartItems: newCartItems}
    
    setLocalStorageCartItems(newCartItems);
  }

  const editAllCatItems = (carts: CartItem[]) => {
    cartItemState.value = {...cartItemState.value, cartItems: carts};

    setLocalStorageCartItems(carts);
  }

  const changeIsAddToCart = (isAddCart: boolean) =>{
    cartItemState.value = {...cartItemState.value, isAddToCart: isAddCart};
  }

  const subTotal =(cart: CartItem) =>{
    return cart.quantity * cart.price;
  }

  const setLocalStorageCartItems = (carts: CartItem[]) =>{
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  const getLocalStorageCartItems = () => {
    return JSON.parse(localStorage.getItem('carts')!) as CartItem[];
  }

  const removeLocalStorageCartItems = () =>{
    localStorage.removeItem('carts');
  }
  
  
  return { 
    cartItems, 
    changeIsAddToCart,
    getLocalStorageCartItems,
    setLocalStorageCartItems,
    removeLocalStorageCartItems,
    stateCartItem, 
    addCartItem, 
    editAllCatItems, 
    editCartItem, 
    deleteCartItem, 
    isAddToCart,
    totalPrice,
    totalQuantity,
    subTotal
   }
})



