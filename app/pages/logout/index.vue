<template>
  <div>
    Logout
  </div>
</template>

<script setup lang="ts">
const {clear, fetch: refreshSession} = useUserSession()
const authStore = useAuthStore();

const cartItemStore = useCartItemStore()

 onMounted(async() => {
   console.log("In onMounted of logout")
    await clear()
   authStore.logout()
   cartItemStore.removeLocalStorageCartItems()
   refreshSession();
    navigateTo("/");
 })

</script>
