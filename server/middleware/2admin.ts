import { useAuth } from "../utils/useAuth"

export default defineEventHandler(async(event) => {
  //----> Get the user auth composable.
  const {adminUser, isUserAdmin} = useAuth();

  const {isAdmin} = await isUserAdmin()
  //----> Demand admin privilege.
  if (isAdmin)await adminUser();
})