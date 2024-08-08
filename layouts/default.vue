<template>
  <v-app>
    <TheNavigationDrawer v-model="drawer" />

    <TheAppBar @toggle-drawer="drawer = !drawer" />

    <v-main>
      <slot /> 
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheNavigationDrawer from '~/components/TheNavigationDrawer.vue';
import TheAppBar from '~/components/TheAppBar.vue';
import TheFooter from '~/components/TheFooter.vue';

const drawer = ref(false); 
</script>
