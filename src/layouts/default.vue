<template>
    <v-layout>

        <v-navigation-drawer>

        </v-navigation-drawer>
        <v-app-bar color="deep-purple-darken-4">
          <v-container>
            {{ authStore.user.name }}
          </v-container>

        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>

<script>
  import { useAuthStore } from '@/stores/auth';

  export default {
    name: 'DefaultLayout',
    data: () => ({

    }),
    computed: {
      authStore() {
        return useAuthStore()
      }
    }
  }
</script>
