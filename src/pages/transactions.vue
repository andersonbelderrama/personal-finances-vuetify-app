<template>
      <v-container>
            <v-row>
                  <v-col cols="12">
                        <v-btn block variant="flat" rounded="xl" color="deep-purple" prepend-icon="mdi:mdi-plus">Novo
                              Lançamento</v-btn>
                  </v-col>
            </v-row>
            <v-row>
                  <v-col cols="12" v-for="transaction in transactions" :key="transaction.id">
                        <v-card rounded="xl">
                              <template v-slot:title>
                                    <span class="font-weight-black">{{ transaction.name }}</span>
                              </template>

                              <template v-slot:subtitle>
                                    {{ transaction.description }}
                              </template>

                              <template v-slot:prepend>
                                    <v-avatar color="deep-purple-darken-2">
                                          <v-icon icon="mdi:mdi-currency-usd"></v-icon>
                                    </v-avatar>
                              </template>

                              <template v-slot:append>
                                    <v-row class="d-flex align-center ga-2 px-2">
                                          <span class="font-weight-black text-h5">{{ formatValue(transaction.value) }}</span>

                                          <v-icon
                                                :icon="transaction.type === 'Despesa' ? 'mdi:mdi-trending-down' : transaction.type === 'Receita' ? 'mdi:mdi-trending-up' : 'mdi:mdi-trending-neutral'"
                                                :color="transaction.type === 'Despesa' ? 'error' : transaction.type === 'Receita' ? 'success' : 'info'">
                                          </v-icon>
                                    </v-row>
                              </template>

                              <v-card-text class="mt-1 pb-0">
                                    <v-row>
                                          <v-col class="d-flex flex-column ga-2">
                                                <v-list-item-subtitle>
                                                      <v-icon icon="mdi:mdi-calendar-check"></v-icon>
                                                      {{ formatDate(transaction.payment_date) }}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                      <v-icon icon="mdi:mdi-calendar-clock"></v-icon>
                                                      {{ formatDate(transaction.due_date) }}
                                                </v-list-item-subtitle>
                                          </v-col>
                                          <v-col class="d-flex justify-end align-center ga-2">
                                                <v-chip class="text-capitalize" color="deep-purple-lighten-2">{{
                                                      transaction.category.name }}</v-chip>
                                                <v-chip
                                                      :color="transaction.type === 'Despesa' ? 'error' : transaction.type === 'Receita' ? 'success' : 'info'">{{
                                                            transaction.type }}</v-chip>
                                          </v-col>
                                    </v-row>
                              </v-card-text>

                              <v-card-actions class="d-flex justify-end align-center">
                                    <v-btn icon="mdi:mdi-dots-vertical"
                                          @click="expandTransaction(transaction.id)"></v-btn>
                                    <v-btn icon="mdi:mdi-pencil" color="info"></v-btn>
                                    <v-btn icon="mdi:mdi-delete" color="error"></v-btn>
                              </v-card-actions>

                              <v-expand-transition>
                                    <div v-show="transaction.show">
                                          <v-divider></v-divider>

                                          <v-card-text>

                                          </v-card-text>
                                    </div>
                              </v-expand-transition>

                        </v-card>
                  </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                  <v-pagination v-if="totalPages > 1" v-model="pagination.current" :length="totalPages"
                        total-visible="4" density="comfortable" @update:model-value="getTransactions()"
                        rounded="circle"></v-pagination>
            </v-row>
      </v-container>

      <v-overlay :model-value="loading" persistent opacity="0.22" scrim="black" class="align-center justify-center">
            <v-progress-circular bg-color="transparent" color="deep-purple-darken-2" size="128" width="10"
                  indeterminate></v-progress-circular>
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
                              page: this.pagination.current,
                              per_page: this.pagination.perPage,
                              include: 'category'
                        }
                  })

                  this.transactions = response.data.data
                  this.pagination.total = response.data.meta.last_page
                  this.pagination.current = response.data.meta.current_page
                  this.transactions.forEach(transaction => transaction.show = false)
                  console.log(response.data)

                  this.loading = false
            },
            expandTransaction(id) {
                  this.transactions.forEach(transaction => {
                        transaction.show = transaction.id === id ? !transaction.show : false;
                  });
            },
            formatDate(date) {
                  if (!date) {
                        return ''
                  }

                  return new Date(date).toLocaleDateString('pt-BR')
            },
            formatValue(value) {
                  if (!value) {
                        return ''
                  }

                  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
            }

      },
      mounted() {
            this.getTransactions()
      },
}

</script>
