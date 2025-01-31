<template>
  <div class="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
    <form @submit.prevent="submitSearch">
      <div class="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
        <input
          type="search"
          name="searchTerm"
          v-model="searchTerm"
          class="border-solid border-2 border-gray-300 focus:border-solid focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3"
        />
        <button
          type="submit"
          class="bg-blue-900 hover:bg-rose-700 text-blue-200 text-lg font-bold py-3 px-8 rounded-lg mx-4 uppercase"
        >
          Search
        </button>
      </div>
    </form>
    <table class="table table-zebra border-1 border-gray-200 p-3">
      <thead class="text-gray-200 text-xl bg-gray-500">
        <tr class="">
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-base text-black"
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <td>
            <img
              :src="user.image"
              :alt="user.name"
              width="80"
              height="80"
              class="object-cover w-20 h-20"
            />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <UserDeleteView
              :user="user"
              :id="user.id"
              @on-delete="deleteUser"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { userBaseUrl } from '~~/constants/userBaseUrl';
import { UserPayload as User } from '~~/models/users/userPayload.model';

const searchTerm = ref("");

const url = `${userBaseUrl}`;

const userStore = useUserStore();

const filteredUsers = ref<User[]>([]);

const {data: users} = await useFetch<User[]>(url);

onMounted(() => {
  loadUser();
});

const loadUser = async () => {
  //const { data: users } = await getResource();
  userStore.editAllUsers(users.value!);
  filteredUsers.value = [...users.value!];
  console.log("in on-mounted, users : ", users);
};

const submitSearch = async () => {
  const searchedUsers = users.value?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.value?.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value?.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.value?.toLowerCase())
  )!;

  filteredUsers.value = [...searchedUsers];
};

const deleteUser = (userId: string) => {
  filteredUsers.value = users.value?.filter((user) => user.id !== userId)!;

  userStore.deleteUser(userId);
};
</script>
