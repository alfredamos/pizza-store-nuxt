import { AuthState } from "~~/states/authState";
import {defineStore} from "pinia"
import type { AuthResponseModel } from "~~/models/auth/authResponse.model";

export const useAuthStore = defineStore("auth", () => {
  //----> State
  const authState = ref<AuthState>({ ...new AuthState() });

  //----> Acts like a constructor
  onMounted(() => {
    const stateOfAuth = getLocalAuth();

    if (!!stateOfAuth) {
      console.log("In the constructor, stateOfAuth : ", stateOfAuth)
      authState.value = { ...stateOfAuth };
    }
  });

  //----> Getters
  const isLoggedIn = computed(() => authState.value?.isLoggedIn);
  const isAdmin = computed(() => authState.value?.isAdmin);
  const currentUser = computed(() => authState.value?.user);
  const token = computed(() => authState.value?.token);
  const userId = computed(() => authState.value?.user?.id)
  //----> Actions
  const login = (authStateRes: AuthState) => {
    updateAuthState(authStateRes);

    setLocalAuth(authStateRes);
  };

  const loginWithoutAuth = (authResponse: AuthResponseModel) => {
      console.log("Point 1, In-login of auth-store, authRes : ", authResponse)
      setAuthState(authResponse);
      setLocalAuth(authState.value);
  }

  const logout = () => {
    removeLocalAuth();

    updateAuthState(new AuthState());
  };

  const setAuthState = (authResponse: AuthResponseModel) => {
    console.log("Point 2, In-login of auth-store, authRes : ", authResponse)
    authState.value = {user: authResponse.user, isAdmin: Boolean(authResponse.isAdmin), isLoggedIn: Boolean(authResponse.isLoggedIn), token: authResponse.token}
  }

  const updateAuthState = (authStateNew: AuthState) => {
    authState.value = { ...authStateNew };
  };

  const setLocalAuth = (authState: AuthState) => {
    
    console.log("In set-local, authState : ", authState)
    localStorage.setItem("auth", JSON.stringify(authState));
  };

  const getLocalAuth = (): AuthState => {
    return JSON.parse(localStorage.getItem("auth")!) as AuthState;
  };

  const removeLocalAuth = () => {
    localStorage.removeItem("auth");
  };

  return {
    isAdmin,
    isLoggedIn,
    currentUser,
    token,
    login,
    loginWithoutAuth,
    logout,
    getLocalAuth,
    userId
  };
});
