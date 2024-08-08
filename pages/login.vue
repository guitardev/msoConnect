// pages/login.vue

<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text-h3 mb-4">เข้าสู่ระบบ</h1>
          <LoginForm /> 
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import LoginForm from '~/components/LoginForm.vue'; // Import component LoginForm
  </script>
  