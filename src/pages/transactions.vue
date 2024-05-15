<template>
      <v-row dense>
            <v-col cols="12" v-for="transaction in transactions" :key="transaction.id">
                  <v-card>
                        <v-card-title class="text-h5">
                              {{ transaction.name }}
                        </v-card-title>
                  </v-card>
            </v-col>
            <v-pagination v-model="pagination.current" :length="totalPages" @update:model-value="getTransactions()"
                  rounded="circle"></v-pagination>
      </v-row>

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

                  console.log(this.pagination.current)
                  

                  const response = await axios.get('/api/transactions', {
                        params: {
                              page: this.pagination.current
                        }
                  });

                  this.transactions = response.data.data
                  this.pagination.total = response.data.meta.last_page
                  this.pagination.current = response.data.meta.current_page

                  this.loading = false

                  console.log(response.data)
                  console.log(this.pagination.total)
            },
      },
      mounted() {
            this.getTransactions()
      },
}

</script>
