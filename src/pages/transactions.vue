<template>
      <v-row dense>
            <v-col cols="12" v-for="transaction in transactions" :key="transaction.id">
                  <v-card>
                        <v-card-title class="text-h5">
                              {{ transaction.name }}
                        </v-card-title>
                  </v-card>
            </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
            <v-pagination v-if="totalPages > 1" v-model="pagination.current" :length="totalPages" total-visible="4" density="comfortable"
                  @update:model-value="getTransactions()" rounded="circle"></v-pagination>
      </v-row>

      <v-overlay :model-value="loading" persistent opacity="0.22" scrim="black" class="align-center justify-center">
            <v-progress-circular bg-color="transparent" color="deep-purple-darken-2" size="128" width="10" indeterminate></v-progress-circular>
      </v-overlay>

</template>

<route lang="yaml">
  meta:
    layout: default
    requiresAuth: true
    title: Transações
</route>

<script>
import axios from '@/plugins/axios'

export default {
      name: 'Transactions',
      components: {

      },
      data: () => ({
            transactions: [],
            loading: false,
            pagination: {
                  perPage: 10,
                  current: 1,
                  total: 0
            },
      }),
      computed: {
            totalPages() {
                  return this.pagination.total
            }
      },
      methods: {
            async getTransactions() {
                  this.loading = true

                  const response = await axios.get('/api/transactions', {
                        params: {
                              page: this.pagination.current
                        }
                  })

                  this.transactions = response.data.data
                  this.pagination.total = response.data.meta.last_page
                  this.pagination.current = response.data.meta.current_page

                  console.log(response.data)

                  this.loading = false

            },
      },
      mounted() {
            this.getTransactions()
      },
}

</script>
