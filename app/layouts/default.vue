<template>
    <NavigationBar    
  />
    
  <main class="grid grid-cols-12">
    <section class="hidden md:block md:col-span-1 bg-gray-300 min-h-screen">
      <SideBar
      />
    </section>
    <section class="col-span-12 md:col-span-11 bg-stone-950 min-h-screen">
      <slot />
    </section>
  </main>
  
</template>
