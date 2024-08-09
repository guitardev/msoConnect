// stores/auth.js

import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi'; // สมมติว่าคุณมี useApi composable สำหรับเรียก API

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async register(userData) {
      const { data, error } = await useApi('/users/register/', {
        method: 'POST',
        body: userData,
      });

      if (error) {
        throw error;
      }

      // ทำอะไรบางอย่างหลังจากลงทะเบียนสำเร็จ เช่น เก็บ token หรือ redirect
      this.user = data;
      this.token = data.token; // หรืออะไรก็ตามที่ backend ของคุณส่งกลับมา
    },
  },
});
