<template>
  <v-img alt="Finanças Pessoais" :src="logoSrc" width="150" />
</template>

<script setup>
import { useTheme } from 'vuetify'
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const theme = useTheme()

const logoSrc = computed(() => theme.global.current.value.dark ? logoDark : logoLight)

</script>
