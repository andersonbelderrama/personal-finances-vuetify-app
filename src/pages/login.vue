<template>
    <v-row class="h-100 ma-0">
        <v-col class="d-none d-lg-flex pa-0 bg-login">
            <div class="bg-gradient-login">

            </div>
        </v-col>
        <v-col lg="4" class="pa-10 px-lg-6">
            <v-container>
                <v-row class="mb-16 pb-4">
                    <v-col>
                        <Logo />
                    </v-col>
                    <v-col class="d-flex justify-end">
                        <v-btn @click="toggleTheme()"
                            :icon="theme.global.current.dark ? 'mdi:mdi-lightbulb-on-outline' : 'mdi:mdi-lightbulb-outline'"></v-btn>
                    </v-col>
                </v-row>
                <v-row class="my-8">
                    <v-col>
                        <h4 class="text-h5 font-weight-bold">Boas vindas!</h4>
                        <p class="text-body-1 text-grey-darken-1">Acesse sua conta para continuar.</p>
                    </v-col>
                </v-row>
                <v-form v-model="valid" validate-on="lazy submit" @submit.prevent="handleLogin()">
                    <v-alert v-if="authStore.error" type="error" color="error" icon="$error" title="Ocorreu um erro!"
                        closable class="mb-10">{{ authStore.error }}</v-alert>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="credentials.email" label="E-mail" type="email" :rules="rules.email"
                                required />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="credentials.password" label="Senha" :type="showPassword ? 'text' : 'password'  "
                                :rules="rules.password" required  :append-inner-icon="showPassword ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"  @click:append-inner="showPassword = !showPassword"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="ml-n5">
                        <v-col>
                            <v-checkbox v-model="credentials.remember" color="deep-purple-darken-2"
                                label="Manter conectado" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn :loading="loading" type="submit" color="deep-purple-darken-2"
                                prepend-icon="fas fa-right-to-bracket" size="large" block>Entrar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
                <v-row class="mt-10 pa-4 d-flex justify-center">
                    <v-col class="d-flex justify-center">
                        <p class="text-grey-darken-1">Esqueceu sua senha? <a href="#"
                                class="text-decoration-none text-deep-purple-lighten-2">Recuperar senha</a></p>
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

<script>
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth';
import Logo from '@/components/Logo.vue';

export default {
  name: 'LoginPage',
  components: {
    Logo
},
data: () => ({
  credentials: {
    email: '',
    password: '',
    remember: false
},
        rules: {
            email: [
                v => !!v || 'E-mail obrigatório',
                v => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ],
            password: [
                v => !!v || 'Senha obrigatória',
                v => (v && v.length >= 6) || 'Senha deve ter pelo menos 6 caracteres',
            ]
        },
        loading: false,
        valid: false,
        showPassword: false,
        theme: useTheme()
    }),
    computed: {
        authStore() {
            return useAuthStore()
        },
    },
    methods: {
        async handleLogin() {
            if (this.valid) {
                this.loading = true
                await this.authStore.handleLogin(this.credentials)
                this.loading = false

            }
        },
        toggleTheme() {
            this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark'
        },
        clearForm() {

        }
    }
}
</script>

<style>
.bg-login {
    background-image: url(@/assets/bg-login.jpg);
    background-size: cover;
}

.bg-gradient-login {
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));
    width: 100%;
    height: 100%;
}
</style>
