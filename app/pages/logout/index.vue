<template>
  <div>
    Logout
  </div>
</template>

<script setup lang="ts">
const {signOut} = useAuth()
const authStore = useAuthStore()
 onMounted(async() => {
   console.log("In onMounted of logout")
   await signOut({ redirect: false });
    authStore.logout()
    navigateTo("/");
 })

</script>

<style lang="scss" scoped>

</style>