import { AuthState } from "~~/states/authState";
import {defineStore} from "pinia"
import type { AuthResponseModel } from "~~/models/auth/authResponse.model";
import type { UserResponseModel } from "~~/models/users/userResponse.model";

export const useAuthStore = defineStore("auth", () => {
  //----> State
  const authState = ref<AuthState>({ ...new AuthState() });

  //----> Acts like a constructor
  onMounted(() => {
    const stateOfAuth = getLocalAuth();

    if (!!stateOfAuth) {
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
      setAuthState(authResponse);
      setLocalAuth(authState.value);
  }

  const logout = () => {
    removeLocalAuth();
    updateAuthState(new AuthState());
  };

  const setAuthState = (authResponse: AuthResponseModel) => {
    authState.value = {user: authResponse.user, isAdmin: Boolean(authResponse.isAdmin), isLoggedIn: Boolean(authResponse.isLoggedIn), token: authResponse.token}
  }

  const updateUserInfo = (userInfo: UserResponseModel) => {
    authState.value = {...authState.value, user: userInfo}
  }

  const updateAuthState = (authStateNew: AuthState) => {
    authState.value = { ...authStateNew };
  };

  const setLocalAuth = (authState: AuthState) => {
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
    updateUserInfo,
    userId
  };
});
