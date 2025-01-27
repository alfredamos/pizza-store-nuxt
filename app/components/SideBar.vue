<template>
  <aside class="w-70 font-semibold mr-6">
    <ul class="flex flex-col gap-y-2 mt-10 text-semibold">
      <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
        <NuxtLink to="/"
          ><FaHome size="40px" class="text-rose-900 font-extrabold"
        /></NuxtLink>
      </li>
      <template v-if="isLoggedIn">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/change-password">
            <FaEdit size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/edit-profile">
            <FaUserEdit size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
      </template>
      <template v-if="isAdmin">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/pizzas">
            <GiFullPizza size="40px" class="text-rose-900 font-extrabold" />
          </NuxtLink>
        </li>
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/users">
            <FaUsers size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
      </template>
      <template v-if="isLoggedIn">
        <li class="mb-8" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/logout">
            <RiLogoutBoxFill size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
      </template>
      <template v-if="!isLoggedIn">
        <li class="mb-8 mt-48" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/login">
            <RiLoginBoxLine size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
        <li class="mb-8 mt-48" style="margin-left: 20px; margin-bottom: 60px">
          <NuxtLink to="/signup">
            <SiGnuprivacyguard size="40px" class="text-rose-900 font-extrabold"
          /></NuxtLink>
        </li>
      </template>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { FaHome, FaEdit, FaUserEdit, FaUsers } from "vue3-icons/fa";
import { GiFullPizza } from "vue3-icons/gi";
import { RiLoginBoxLine, RiLogoutBoxFill } from "vue3-icons/ri";
import { SiGnuprivacyguard } from "vue3-icons/si";

const {isAdmin, isLoggedIn} = storeToRefs(useAuthStore());
</script>

<style lang="scss" scoped></style>
