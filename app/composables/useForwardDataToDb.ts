import type { Method } from "~~/constants/apiVerbers"

export function useForwardDataToDb<T,U>(url: string, method: Method){
 async function sentDataToDb(body: T){
  const data = await $fetch<U>(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body? body : {}
    })

  return {data}
 } 

  return {sentDataToDb}
}