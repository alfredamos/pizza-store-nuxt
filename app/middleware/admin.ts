import { Role } from "@prisma/client"

export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()
  // direct the user to the login screen if they're not authenticated
  if (Boolean(user.value?.role === Role.Admin)) {
    return navigateTo('/login')
  }
})