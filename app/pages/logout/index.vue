<template>
  <div>
    Logout
  </div>
</template>

<script setup lang="ts">
const {clear, fetch: refreshSession} = useUserSession()
const authStore = useAuthStore()
 onMounted(async() => {
   console.log("In onMounted of logout")
    await clear()
   authStore.logout()
   refreshSession();
    navigateTo("/");
 })

</script>

<style lang="scss" scoped>

</style>