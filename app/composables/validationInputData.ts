import { StatusCodes } from "http-status-codes";
import type { Schema } from "zod";

export function  useValidateInputData(){
  function validateDataSchema<T>(schema: Schema<T>, resource: T){
    const {success, data, error} = schema.safeParse(resource);
    const errorMessages = error?.errors.map(err => err.message + ", ").join(" , ")
    
    console.log({success, data, error})
    if(!success) throw createError({statusMessage: errorMessages})
  
      return {data}
    }

  return {validateDataSchema};
}