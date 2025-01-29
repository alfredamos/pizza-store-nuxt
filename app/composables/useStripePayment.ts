import type { Method } from "~~/constants/apiVerbers"

export function useStripePayment<T, U>(method: Method){
 async function stripeCheckout(url: string, body: T){
  const data = await $fetch<U>(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) ?? {}
    })

  return {data}
 }

  return {stripeCheckout}
}