<template>
  <div
    class="navbar shadow-2xl bg-zinc-100 rounded text-black font-semibold py-4 px-4 mt-2 flex justify-between items-center"
  >
    <div class="mt-6 relative w-full">
      <div
        :class="
          isLoggedIn || totalQuantity === 0
            ? 'btn btn-ghost text-xl absolute -top-10 left-0'
            : 'hidden'
        "
      >
        Pizzeria
        <NuxtLink class="flex justify-center item-center" to="/orders/cart">
          <span
            :class="
              totalQuantity
                ? 'inline-block bg-rose-900 text-rose-100 rounded-full py-1 px-3'
                : 'undefined'
            "
          >
            {{ totalQuantity ? totalQuantity : undefined }}
          </span></NuxtLink
        >
      </div>
    </div>

    <div class="flex gap-4 text-xl">
      <div class="text-xl flex self-center">{{ firstName }}</div>
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar"
          @mouseenter="onOpenDropdown()"
        >
          <img
            class="w-15 h-auto rounded-full object-cover aspect-square border-indigo-900 border-2"
            alt="Tailwind CSS Navbar component"
            :src="currentUser.image || '/avatar3.jpg'"
          />
        </div>
        <ul
          tabindex="0"
          :class="
            open
              ? 'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow block'
              : 'hidden'
          "
          @mouseleave="onOpenDropdown()"
        >
          <template v-if="!!isLoggedIn">
            <li>
              <NuxtLink to="/change-password">Change Password</NuxtLink>
            </li>
            <li><NuxtLink to="/edit-profile">Edit Profile</NuxtLink></li>
          </template>

          <template v-if="isAdmin">
            <li><NuxtLink to="/orders">All Orders</NuxtLink></li>
            <li>
              <NuxtLink to="/orders/delivered"
                >Delivered Orders</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/orders/pending">Pending Orders</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/orders/shipped">Shipped Orders</NuxtLink>
            </li>
            <li><NuxtLink to="/pizzas/list">Pizzas</NuxtLink></li>
            <li><NuxtLink to="/users">Users</NuxtLink></li>
          </template>

          <template v-if="!!isLoggedIn">
            <li>
              <NuxtLink to="/orders/by-user-id">My Orders</NuxtLink>
            </li>
            <li><NuxtLink to="/logout">Logout</NuxtLink></li>
          </template>

          <template v-if="!isLoggedIn">
            <li><NuxtLink to="/login">Login</NuxtLink></li>
            <li><NuxtLink to="/signup">Signup</NuxtLink></li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { isAdmin, isLoggedIn, currentUser } = storeToRefs(authStore);
const { totalQuantity } = storeToRefs(useCartItemStore());

const firstName = computed(() => currentUser.value?.name?.split(" ")[0] ?? "");

const open = ref(true);


const onOpenDropdown = () => {
  console.log("In-navbar!!!");
  open.value = !open.value;

  console.log("open : ", open.value);
};
</script>

