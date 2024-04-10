<template>
  <v-row  class="h-100 ma-0">
    <v-col class="d-none d-lg-flex pa-0 bg-login">
      <div class="bg-gradient-login">

      </div>
    </v-col>
    <v-col lg="4" class="pa-10 px-lg-6">
      <v-container>
        <v-row class="mb-16 pb-4">
          <v-col >
            <Logo />
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn @click="toggleTheme" :icon="theme.global.current.value.dark ? 'mdi:mdi-lightbulb-on-outline' : 'mdi:mdi-lightbulb-outline'"></v-btn>
          </v-col>
        </v-row>
        <v-row class="my-8">
          <v-col>
            <h4 class="text-h5 font-weight-bold">Boas vindas!</h4>
            <p class="text-body-1 text-grey-darken-1">Acesse sua conta para continuar.</p>
          </v-col>
        </v-row>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field label="E-mail" type="email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Senha" type="password" />
            </v-col>
          </v-row>
          <v-row class="ml-n5">
            <v-col>
              <v-checkbox color="deep-purple-darken-2" label="Manter conectado" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" color="deep-purple-darken-2" prepend-icon="fas fa-right-to-bracket" size="large" block>Entrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row class="mt-10 pa-4 d-flex justify-center">
          <v-col class="d-flex justify-center">
            <p class="text-grey-darken-1">Esqueceu sua senha? <a href="#" class="text-decoration-none text-deep-purple-lighten-2">Recuperar senha</a></p>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<route lang="yaml">
  meta:
    layout: guest
</route>

<script setup>
import { useTheme } from 'vuetify'

import Logo from '@/components/Logo.vue';

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style>
.bg-login{
  background-image: url(@/assets/bg-login.jpg);
  background-size: cover;
}

.bg-gradient-login {
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));
  width: 100%;
  height: 100%;
}
</style>
