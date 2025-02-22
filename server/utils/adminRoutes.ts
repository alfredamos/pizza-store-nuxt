const adminRoutes = [
  '/api/pizzas/new',
  '/api/pizzas/:id/delete',
  '/api/pizzas/:id/edit',
  '/api/orders',
  '/api/orders/:orderId',
  '/api/users',
  '/api/users/:id',
  '/api/users/:id/delete',
]

export const isAdminRoute = (route: string) => adminRoutes.includes(route)