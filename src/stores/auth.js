// Utilities
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import router from '@/router'
//import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: localStorage.getItem('isAuthenticated') ? true : false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        error: null
    }),

    actions: {
        async handleLogin(credentials) {

            this.error = null

            if (credentials.email && credentials.password) {

                try {
                    await axios.get('/sanctum/csrf-cookie')

                    const response = await axios.post('/login', credentials)

                    if (response.status === 204 || response.status === 200) {
                        localStorage.setItem('isAuthenticated', 'true')
                        this.isAuthenticated = true

                        await this.getUser()

                        router.push('/')
                    }
                } catch (error) {
                    if (error.response.status === 422) {
                        this.error = error.response.data.message
                    } else {
                        console.error(error)
                    }


                }
            }
        },

        async handleLogout() {
            try {

                const response = await axios.post('/logout')

                if (response.status === 204) {
                    localStorage.clear()
                    this.isAuthenticated = false
                    this.user = null
                    document.cookie = `XSRF-TOKEN=; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT;`
                    document.cookie = `laravel_session=; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT;`

                    router.push('/login')
                }

            }
            catch (error) {
                console.error(error)
            }
        },

        async getUser() {

            try {
                const response = await axios.get('/api/user')

                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.user = response.data
                }

            }
            catch (error) {
                console.error(error)
            }
        },
    },

})
