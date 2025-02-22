import { createPizzaAction } from "~~/actions/pizza.action";
import { pizzaSchema } from "~~/validations/pizza.validation";

export default defineEventHandler(async(event) => {
  //-----> Get and validate body.
  const body = await readValidatedBody(event, (body) => pizzaSchema.parse(body));

  //----> create new pizza and store in database.
  const response = await createPizzaAction(body);

  return response
})