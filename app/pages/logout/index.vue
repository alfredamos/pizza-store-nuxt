<template>
  <div>
    Logout
  </div>
</template>

<script setup lang="ts">
const {clear, fetch: refreshSession} = useUserSession()
const authStore = useAuthStore();
const {removeLocalStorage} = usePizzaStore()

const cartItemStore = useCartItemStore()

 onMounted(async() => {
   console.log("In onMounted of logout")
    await clear()
   authStore.logout()
   cartItemStore.removeLocalStorageCartItems()
   removeLocalStorage("pizzas");
   refreshSession();
    navigateTo("/");
 })

 

</script>
