// components/TheAppBar.vue
<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>MSO Connect</v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="isAuthenticated">
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="{ name: 'profile' }">
            <v-list-item-title>โปรไฟล์</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-else>
      <v-btn :to="{ name: 'login' }" prepend-icon="mdi-login" icon-size="24" icon-color="white">เข้าสู่ระบบ</v-btn>
      <v-btn :to="{ name: 'register' }" prepend-icon="mdi-account-plus" icon-size="24" icon-color="white">ลงทะเบียน</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { computed } from 'vue';

const emit = defineEmits(['toggle-drawer']);
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const toggleDrawer = () => {
  emit('toggle-drawer');
};

const logout = () => {
  authStore.logout();
  // เพิ่ม logic สำหรับการ redirect หรือแจ้งเตือนผู้ใช้หลัง logout
};
</script>

  