<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h3 mb-4">ลงทะเบียน</h1>
        <RegisterForm @register-success="handleRegisterSuccess" />
        <div v-if="authError" class="error--text mt-2">
          {{ authError }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from '~/components/RegisterForm.vue';

const authStore = useAuthStore();
const router = useRouter();

const authError = computed(() => authStore.error);

const handleRegisterSuccess = () => {
  // เพิ่ม logic สำหรับการ redirect หรือแสดงผลลัพธ์หลัง register สำเร็จ เช่น
  router.push('/login'); // Redirect ไปยังหน้า login หลังจาก register สำเร็จ
};
</script>
