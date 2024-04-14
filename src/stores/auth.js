// Utilities
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import router from '@/router'
//import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,//localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    user: null
  }),

  actions: {
    async handleLogin (credentials) {

      if(credentials.email && credentials.password) {

        try {
          await axios.get('/sanctum/csrf-cookie')

          const response = await axios.post('/login', credentials)


          if(response.status === 204 || response.status === 200) {
            this.isAuthenticated = true
            await this.getUser()
            router.push('/');
          }
        } catch (error) {
          console.error(error)
        }
      }
    },

    async handleLogout () {
      try {

        const response = await axios.post('/logout')

        if(response.status === 204) {
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

    async getUser () {

      try {
        const response = await axios.get('/api/user')

        if(response.status === 200) {
          this.user = response.data
        }

      }
      catch (error) {
        console.error(error)
      }
    }
  },




})