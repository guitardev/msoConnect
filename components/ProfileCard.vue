// components/ProfileCard.vue
<template>
    <v-card>
      <v-card-title>
        {{ user.firstName }} {{ user.lastName }}
      </v-card-title>
  
      <v-card-text>
        <v-avatar size="100" class="mb-4">
          <v-img :src="user.avatarUrl" alt="Avatar"></v-img>
        </v-avatar>
  
        <div>
          <strong>อีเมล:</strong> {{ user.email }}
        </div>
        <div>
          <strong>ประวัติ:</strong> {{ user.bio }}
        </div>
        <div>
          <strong>วันเกิด:</strong> {{ user.birthDate }}
        </div>
      </v-card-text>
  
      <v-card-actions>
        <v-btn color="primary" @click="editProfile">แก้ไขข้อมูล</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';
  
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  
  const editProfile = () => {
    // เพิ่ม logic สำหรับการแก้ไข profile
  };
  </script>
  