<template>
  <div v-if="user">
    <h1>Welcome, {{ user.first_name }} {{ user.last_name }}!</h1>
    <p>Email: {{ user.email }}</p>
    </div>
  <div v-else>
    <p>Loading user profile...</p> 
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

onMounted(async () => {
  if (!user.value) { 
    try {
      await authStore.fetchUserProfile();
    } catch (error) {
      // Handle error if fetching user profile fails
      console.error('Error fetching user profile:', error);
    }
  }
});
</script>
