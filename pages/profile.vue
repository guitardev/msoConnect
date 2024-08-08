// pages/profile.vue

<template>
  <v-container v-if="user">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h3 mb-4">ข้อมูลส่วนตัว</h1>
        <ProfileCard :user="user" @edit-profile="handleEditProfile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { computed } from "vue";
import ProfileCard from "~/components/ProfileCard.vue";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const handleEditProfile = () => {
  // เพิ่ม logic สำหรับการแก้ไข profile
};

// ดึงข้อมูล profile เมื่อเข้าสู่หน้านี้ (คุณอาจต้องปรับแต่ง logic นี้)
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.getUserProfile();
  }
});
</script>
