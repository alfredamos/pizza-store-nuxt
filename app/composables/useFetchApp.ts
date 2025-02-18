import type { Method } from "~~/constants/apiVerbers"

export function useFetchApp<T>(method: Method){
 async function fetchApp(url: string, body: T){
  const data = await $fetch<T>(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body? body : {} 
    })

  return {data}
 }

  return {fetchApp}
}