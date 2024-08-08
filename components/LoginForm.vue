// components/LoginForm.vue

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

    <v-btn type="submit" color="primary" :loading="isLoading">เข้าสู่ระบบ</v-btn>
    <div v-if="error" class="error--text mt-2">
      {{ error }}
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const identifier = ref('');
const password = ref('');

const isLoading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const emit = defineEmits(['login-success']);

const login = async () => {
  try {
    const loginData = await authStore.login('email', identifier.value, password.value); // หรือใช้ identifierType อื่นๆ ตามต้องการ
    emit('login-success', loginData); // ส่ง event เมื่อ login สำเร็จ
  } catch (error) {
    // Error จะถูกจัดการใน authStore แล้ว
  }
};
</script>
