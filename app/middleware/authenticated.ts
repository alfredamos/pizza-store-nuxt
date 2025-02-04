export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user} = useUserSession()
  console.log({loggedIn: loggedIn.value, user: user.value?.name})
  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
