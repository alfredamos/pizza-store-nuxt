import { Role } from "@prisma/client"

export default defineNuxtRouteMiddleware(() => {
  const { user, session } = useUserSession()
  // direct the user to the login screen if they're not authenticated
  const isAdmin = user.value?.role === Role.Admin
  console.log("in admin-middleware, isAdmin: ", isAdmin)
  console.log({user: user.value, session: session.value})
  console.log({role: session.value?.user?.role})
  if (!isAdmin) {
    return navigateTo('/login')
  }
})