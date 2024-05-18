/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
      components: {
            VDateInput,
      },
      theme: {
            defaultTheme: 'dark',
      },
      defaults: {
            VTextField: {
                  variant: 'outlined'
            },
            VAutocomplete: {
                  variant: 'outlined',
                  menuIcon: 'mdi:mdi-chevron-down'
            },
            VDateInput: {
                  variant: 'outlined',
                  prependIcon: '',
                  prependInnerIcon: 'mdi:mdi-calendar',
                  nextIcon: 'mdi:mdi-chevron-right',
                  prevIcon: 'mdi:mdi-chevron-left',
                  cancelText: 'Cancelar',
            }
      },
      icons: {
            defaultSet: 'fa',
            aliases,
            sets: {
                  fa,
                  mdi,
            }
      }
})
