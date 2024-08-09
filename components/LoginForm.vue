<template>
  <form @submit.prevent="register">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password">
    </div>
    <div>
      <label for="first_name">First Name:</label>
      <input type="text" id="first_name" v-model="formData.first_name">
    </div>
    <div>
      <label for="last_name">Last Name:</label>
      <input type="text" id="last_name" v-model="formData.last_name">
    </div>
    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth'; // สมมติว่าคุณมี useAuthStore สำหรับจัดการ authentication

const authStore = useAuthStore();
const formData = ref({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
});

const register = async () => {
  try {
    await authStore.register(formData.value);
    // ทำอะไรบางอย่างหลังจากลงทะเบียนสำเร็จ เช่น redirect ไปยังหน้า login
  } catch (error) {
    // จัดการข้อผิดพลาด เช่น แสดง error message
    console.error(error);
  }
};
</script>
