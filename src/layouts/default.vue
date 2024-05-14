<template>
      <v-layout>
            <v-app-bar :color="$vuetify.theme.global.current.dark ? 'grey-darken-4' : 'grey-lighten-4'" class="py-1">
                  <template v-slot:prepend class="d-flex p-2">
                        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                        <div class="px-6">
                              <a href="https://vuetifyjs.com" rel="noopener noreferrer" target="_blank">
                                    <Logo width="130" />
                              </a>
                        </div>
                  </template>

                  <template v-slot:append>
                        {{ authStore.user.name }}
                        <v-btn @click="toggleTheme()"
                              :icon="$vuetify.theme.global.current.dark ? 'mdi:mdi-lightbulb-on-outline' : 'mdi:mdi-lightbulb-outline'"></v-btn>
                  </template>

            </v-app-bar>

            <v-navigation-drawer
                  :color="$vuetify.theme.global.current.dark ? 'deep-purple-darken-2' : 'deep-purple-darken-1'"
                  v-model="drawer">
                  <v-divider></v-divider>
                  <v-list>
                        <v-list-subheader color="deep-purple-lighten-5">MENU PRINCIPAL</v-list-subheader>
                        <v-list-item v-for="item in items" :key="item.title" :title="item.title" :to="item.to"
                              :prepend-icon="item.icon" :active="$route.path === item.to"></v-list-item>
                  </v-list>
            </v-navigation-drawer>

            <v-main>
                  <v-container grid-list-xs>
                        <h1>{{ $route.meta.title }}</h1>
                        <v-divider></v-divider>
                        <router-view />
                  </v-container>

            </v-main>
      </v-layout>
</template>

<script>
import Logo from '@/components/Logo.vue';
import { useAuthStore } from '@/stores/auth';

export default {
      name: 'DefaultLayout',
      components: {
            Logo
      },
      data: () => ({
            drawer: true,
            items: [
                  { title: 'Dashboard', icon: 'mdi:mdi-view-dashboard', to: '/' },
                  { title: 'Contas', icon: 'mdi:mdi-account-box', to: '/about' },
                  { title: 'Transações', icon: 'mdi:mdi-gavel', to: '/transactions' },
            ],

      }),
      computed: {
            authStore() {
                  return useAuthStore()
            },
      },
      methods: {
            toggleTheme() {
                  this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.dark ? 'light' : 'dark'
            },
      }
}
</script>
