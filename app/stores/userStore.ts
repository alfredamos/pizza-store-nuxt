import type { UserPayload } from "~~/models/users/userPayload.model";
import { UserState } from "~~/states/userState";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  //----> State
  const userState = ref<UserState>({ ...new UserState() });

  //----> Getters
  const users = computed(() => !!userState.value?.users?  userState.value.users: []);

  //----> Acts like a constructor
  onMounted(() => {
    const stateOfUser = getLocalStorageUsers() ?? [];

    if (!!stateOfUser) {
      userState.value = { ...userState.value, users: stateOfUser };
    }
  });

  //----> Actions
  const addUser = (user: UserPayload) => {
    const newUsers = [...userState.value?.users, user];
    userState.value = { ...userState.value, users: newUsers };

    setLocalStorageUsers(newUsers);
  };

  const deleteUser = (userId: string) => {
    const newUsers = userState.value?.users?.filter(
      (user) => user.id !== userId
    );

    userState.value = { ...userState.value, users: newUsers };

    setLocalStorageUsers(newUsers);
  };

  const editUser = (userPayload: UserPayload) => {
    const newUsers = userState.value?.users?.map((user) =>
      user.id === userPayload.id ? userPayload : user
    );
    userState.value = { ...userState.value, users: newUsers };

    setLocalStorageUsers(newUsers);
  };

  const editAllUsers = (users: UserPayload[]) => {
    userState.value = {...userState.value, users };

    setLocalStorageUsers(users);
  };

  const setLocalStorageUsers = (users: UserPayload[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const getLocalStorageUsers = () => {
    return JSON.parse(localStorage.getItem("users")!) as UserPayload[];
  };

  const removeLocalStorageUsers = () => {
    localStorage.removeItem("users");
  };

  return {
    addUser,
    deleteUser,
    editAllUsers,
    editUser,
    getLocalStorageUsers,
    setLocalStorageUsers,
    removeLocalStorageUsers,
    users,
  };
});
