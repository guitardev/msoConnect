<template>
  <v-container v-if="!isAuthenticated">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h3 mb-4">เข้าสู่ระบบ</h1>
        <LoginForm @login-success="handleLoginSuccess" />
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
import { useRouter } from 'vue-router'; // สำหรับการ redirect
import LoginForm from '~/components/LoginForm.vue';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const authError = computed(() => authStore.error);

const handleLoginSuccess = () => {
  router.push('/'); // หรือไปยังหน้าอื่นๆ ตามต้องการ
};

// ถ้าผู้ใช้ล็อกอินแล้ว ให้ redirect ไปยังหน้าหลัก
if (isAuthenticated.value) {
  router.push('/');
}
</script>
