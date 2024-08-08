<template>
  <v-navigation-drawer app v-model="isDrawerOpen">
    <v-list>
        <v-list-item v-for="link in links" :key="link.title" :to="link.to" color="primary">
          <v-icon start>{{ link.icon }}</v-icon>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDrawerOpen = ref(false);
  const links = [
    { title: 'หน้าหลัก', to: '/', icon: 'mdi-home' },
    { title: 'เกี่ยวกับเรา', to: '/about', icon: 'mdi-information' },
    { title: 'ติดต่อเรา', to: '/contact', icon: 'mdi-email' },
  ];
  </script>
  