//pages/register.vue

<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text-h3 mb-4">ลงทะเบียน</h1>
          <RegisterForm /> 
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import RegisterForm from '~/components/RegisterForm.vue'; // Import component RegisterForm
  </script>
  