// pages/profile.vue

<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text-h3 mb-4">ข้อมูลส่วนตัว</h1>
          <ProfileCard /> 
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import ProfileCard from '~/components/ProfileCard.vue'; // Import component ProfileCard
  </script>
  