// component/LoginForm.vue
<template>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="identifier"
        label="อีเมล / หมายเลขบัตรประชาชน / เบอร์โทรศัพท์"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        label="รหัสผ่าน"
        type="password"
        required
      ></v-text-field>
  
      <v-btn type="submit" color="primary">เข้าสู่ระบบ</v-btn>
    </v-form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth'; // Import Pinia store สำหรับ authentication
  
  const authStore = useAuthStore();
  const identifier = ref('');
  const password = ref('');
  
  const login = async () => {
    await authStore.login(identifier.value, password.value);
    // เพิ่ม logic สำหรับการ redirect หรือแสดงผลลัพธ์หลัง login สำเร็จ
  };
  </script>
  