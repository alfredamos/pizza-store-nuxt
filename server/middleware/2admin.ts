import { useAuth } from "../utils/useAuth"

export default defineEventHandler(async(event) => {
  //----> Get the user auth composable.
  const {adminUser, isUserAdmin} = useAuth();

  //----> Demand admin privilege.
  if (await isUserAdmin())await adminUser();
})