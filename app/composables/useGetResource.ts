import type { Method } from "~~/constants/apiVerbers"

export function useGetResource<T>(url: string, method: Method){
 async function getResource(){
  const data = await $fetch<T>(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

  return {data}
 }

  return {getResource}
}