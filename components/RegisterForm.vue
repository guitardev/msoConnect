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
      v-model="confirmPassword"
      label="ยืนยันรหัสผ่าน"
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

    <v-btn type="submit" color="primary" :loading="isLoading">ลงทะเบียน</v-btn>
    <div v-if="error" class="error--text mt-2">
      {{ error }}
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');

const isLoading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const emit = defineEmits(['register-success']);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    // จัดการกรณีที่รหัสผ่านไม่ตรงกัน
    alert('รหัสผ่านไม่ตรงกัน');
    return;
  }

  try {
    const registerData = await authStore.register(email.value, password.value, firstName.value, lastName.value);
    emit('register-success', registerData);
  } catch (error) {
    // Error handling is done in the authStore
  }
};
</script>
