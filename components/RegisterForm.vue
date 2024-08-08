// components/RegisterForm.vue
<template>
    <v-form @submit.prevent="register">
      <v-text-field
        v-model="email"
        label="อีเมล"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        label="รหัสผ่าน"
        type="password"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="firstName"
        label="ชื่อ"
      ></v-text-field>
  
      <v-text-field
        v-model="lastName"
        label="นามสกุล"
      ></v-text-field>
  
      <v-btn type="submit" color="primary">ลงทะเบียน</v-btn>
    </v-form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth'; // Import Pinia store สำหรับ authentication
  
  const authStore = useAuthStore();
  const email = ref('');
  const password = ref('');
  const firstName = ref('');
  const lastName = ref('');
  
  const register = async () => {
    await authStore.register(email.value, password.value, firstName.value, lastName.value);
    // เพิ่ม logic สำหรับการ redirect หรือแสดงผลลัพธ์หลัง register สำเร็จ
  };
  </script>
  