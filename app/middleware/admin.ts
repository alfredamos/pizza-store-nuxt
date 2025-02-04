import { Role } from "@prisma/client"

export default defineNuxtRouteMiddleware(() => {
  const { user} = useUserSession()
  // direct the user to the login screen if they're not authenticated
  const isAdmin = user.value?.role === Role.Admin
  if (!isAdmin) {
    return navigateTo('/login')
  }
})