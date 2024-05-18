<template>
      <v-container>
            <v-row>
                  <v-col cols="12">
                        <v-btn block variant="flat" rounded="xl" color="deep-purple" prepend-icon="mdi:mdi-plus"
                              @click="modalTransaction" :loading="loading">Novo
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
                                          <span class="font-weight-black text-h6 text-md-h5"
                                                :class="transaction.type === 'Despesa' ? 'text-error' : transaction.type === 'Receita' ? 'text-success' : 'text-info'">{{
                                                      formatValue(transaction.value) }}</span>

                                          <v-icon
                                                :icon="transaction.type === 'Despesa' ? 'mdi:mdi-minus' : transaction.type === 'Receita' ? 'mdi:mdi-plus' : 'mdi:mdi-equal'"
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
                                    <v-btn icon="mdi:mdi-pencil"></v-btn>
                                    <v-btn icon="mdi:mdi-delete" @click="openDeleteDialog(transaction.id)"></v-btn>
                              </v-card-actions>

                              <v-expand-transition>
                                    <div v-show="transaction.show">
                                          <v-divider></v-divider>
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

      <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card prepend-icon="mdi:mdi-delete-alert" text="Deseja realmente deletar essa transação?"
                  title="Atenção!" transition="dialog-bottom-transition">

                  <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn color="red" variant="flat" @click="deleteTransaction(this.id)">
                              Deletar
                        </v-btn>

                        <v-btn @click="dialog = false">
                              Cancelar
                        </v-btn>
                  </template>
            </v-card>
      </v-dialog>

      <v-dialog v-model="modal.show" max-width="600">
            <v-card prepend-icon="mdi:mdi-cash" :title="modal.edit ? 'Editar Transação' : 'Nova Transação'">
                  <v-divider></v-divider>
                  <v-card-text>
                        <v-row dense>
                              <v-col cols="12">
                                    <v-text-field label="Nome" required></v-text-field>
                              </v-col>

                              <v-col cols="12">
                                    <v-text-field label="Descrição"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-text-field label="Valor"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-autocomplete :items="types.map((type) => type.value)"
                                          label="Tipo"></v-autocomplete>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-autocomplete :items="categories.map((category) => category.name)"
                                          label="Categoria"></v-autocomplete>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-autocomplete :items="accounts.map((accounts) => accounts.name)"
                                          label="Conta"></v-autocomplete>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-date-input v-model="model" label="Pagamento"
                                          prepend-inner-icon="mdi:mdi-calendar-check"></v-date-input>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-date-input v-model="model" label="Vencimento"
                                          prepend-inner-icon="mdi:mdi-calendar-clock"></v-date-input>
                              </v-col>

                              <v-col cols="12" sm="6">
                                    <v-switch :model-value="true" color="deep-purple-darken-2" label="Pago"></v-switch>
                              </v-col>
                        </v-row>

                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Fechar" variant="plain" @click="modal.show = false"></v-btn>

                        <v-btn prepend-icon="mdi:mdi-content-save" color="deep-purple-darken-2" text="Salvar"
                              variant="flat" @click="modal.show = false"></v-btn>
                  </v-card-actions>
            </v-card>
      </v-dialog>

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
            types: [
                  { id: 1, value: 'Receita' },
                  { id: 2, value: 'Despesa' },
                  { id: 3, value: 'Transferência' }
            ],
            categories: [],
            accounts: [],

            loading: false,
            dialog: false,
            modal: {
                  show: false,
                  edit: false
            },
            pagination: {
                  perPage: 10,
                  current: 1,
                  total: 0
            },
            model: null,
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
                              include: 'category,account'
                        }
                  })

                  this.transactions = response.data.data
                  this.pagination.total = response.data.meta.last_page
                  this.pagination.current = response.data.meta.current_page
                  this.transactions.forEach(transaction => transaction.show = false)
                  console.log(response.data)

                  this.loading = false
            },
            async deleteTransaction(id) {
                  await axios.delete(`/api/transactions/${id}`)
                  this.dialog = false
                  this.getTransactions()
            },
            async getCategories() {
                  const response = await axios.get('/api/categories')

                  this.categories = response.data.data

                  console.log(response.data)
            },
            async getAccounts() {
                  const response = await axios.get('/api/accounts')

                  this.accounts = response.data.data

                  console.log(response.data)
            },
            openDeleteDialog(id) {
                  this.dialog = true
                  this.id = id
            },
            modalTransaction() {
                  this.loading = true
                  this.modal.show = true
                  this.loading = false

            },
            expandTransaction(id) {
                  this.transactions.forEach(transaction => {
                        transaction.show = transaction.id === id ? !transaction.show : false;
                  });
            },
            formatDate(date) {
                  if (!date) {
                        return 'Não informado'
                  }

                  return new Date(date).toLocaleDateString('pt-BR')
            },
            formatValue(value) {
                  if (!value) {
                        return 'Não informado'
                  }

                  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
            }

      },
      mounted() {
            this.getTransactions()
            this.getCategories()
            this.getAccounts()
      },
}

</script>
