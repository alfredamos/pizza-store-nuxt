<template>
  <div>
    Logout
  </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore()
 onMounted(() => {
   console.log("In onMounted of logout")
  authStore.logout()
  navigateTo("/");
 })

</script>

<style lang="scss" scoped>

</style>