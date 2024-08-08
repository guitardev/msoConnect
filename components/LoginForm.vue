// components/LoginForm.vue

<template>
  <v-form @submit.prevent="login">
    <v-select
      v-model="identifierType"
      :items="identifierTypes"
      label="ประเภทการเข้าสู่ระบบ"
      required
    ></v-select>

    <v-text-field
      v-model="identifier"
      :label="identifierTypeLabel"
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
import { LoginMethod } from '~/types'; // Import type definitions if you have them

const authStore = useAuthStore();
const identifierType = ref(LoginMethod.EMAIL); // Default to email login
const identifier = ref('');
const password = ref('');

const isLoading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const identifierTypes = [
  { text: 'อีเมล', value: LoginMethod.EMAIL },
  { text: 'หมายเลขบัตรประชาชน', value: LoginMethod.NATIONAL_ID },
  { text: 'เบอร์โทรศัพท์', value: LoginMethod.PHONE_NUMBER },
];

const identifierTypeLabel = computed(() => {
  const selectedType = identifierTypes.find(type => type.value === identifierType.value);
  return selectedType ? selectedType.text : '';
});

const emit = defineEmits(['login-success']);

const login = async () => {
  try {
    const loginData = await authStore.login(identifierType.value, identifier.value, password.value);
    emit('login-success', loginData);
  } catch (error) {
    // Error handling is done in the authStore
  }
};
</script>

