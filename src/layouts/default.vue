<template>
  <v-app>
    <v-main>
      <div class="d-flex justify-space-around">
        <RouterLink to="/" >Principal</RouterLink>
        <RouterLink to="/about" >About</RouterLink>
        <button @click="authStore.handleLogout">Logout</button>

        <p>{{ authStore.isAuthenticated }}</p>
        <p>{{ authStore.user.name}}</p>

      </div>

      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore()

  console.log(authStore.isAuthenticated)
</script>
