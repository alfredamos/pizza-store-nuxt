
type Method = 'post' | 'get'| 'patch' | 'put' | 'delete' | 'POST' | 'PATCH' | 'GET' | 'PUT' | 'DELETE';


export function useSentDataToDb<T>(url: string, method: Method){
 async function sentDataToDb(body: T){
  const data = await $fetch<T>(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  return {data}
 } 

  return {sentDataToDb}
}