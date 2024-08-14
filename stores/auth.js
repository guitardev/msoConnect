// stores/auth.js

import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import { useRouter } from 'vue-router';
//import jwt_decode from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access: null,
    refresh: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.access,
  },
  actions: {
    async login(credentials) {
      try {
        const { data, error } = await useApi('token/', {
          method: 'POST',
          body: credentials,
        });

        if (error) {
          // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการล็อกอิน
          alert(error.message || 'เกิดข้อผิดพลาดในการล็อกอิน');
          throw error;
        } else {
          this.access = data.access;
          this.refresh = data.refresh;

          // เก็บ token ใน localStorage หลังจากดึงข้อมูล user สำเร็จ
          localStorage.setItem('access_token', this.access);
          localStorage.setItem('refresh_token', this.refresh);

          this.user = await this.fetchUserProfile();

          const router = useRouter();
          router.push('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async register(userData) {
      try {
        const { data, error } = await useApi('/users/register/', {
          method: 'POST',
          body: userData,
        });

        if (error) {
          // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการลงทะเบียน
          alert(error.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
          throw error;
        } else {
          const router = useRouter();
          router.push('/login');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      const router = useRouter();
      router.push('/login');
    },

    async fetchUserProfile() {
      if (!this.access) {
        this.access = localStorage.getItem('access_token');
        this.refresh = localStorage.getItem('refresh_token');
      }

      if (!this.access) {
        return null;
      }

      try {
        const { data, error } = await useApi('users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.access}`
          }
        });

        if (error) {
          if (error.response && error.response.status === 401) {
            const success = await this.refreshToken();
            if (success) {
              return this.fetchUserProfile();
            } else {
              this.logout();
              // แสดงข้อความแจ้งเตือนเมื่อ token หมดอายุและไม่สามารถ refresh ได้
              alert('เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง'); 
              throw error;
            }
          } else {
            console.error('Failed to fetch user profile:', error);
            return null;
          }
        } else {
          return data;
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    },

    async refreshToken() {
      try {
        const { data, error } = await useApi('token/refresh/', {
          method: 'POST',
          body: {
            refresh: this.refresh
          }
        });

        if (error) {
          console.error('Failed to refresh token:', error);
          return false;
        } else {
          this.access = data.access;
          localStorage.setItem('access_token', this.access);
          return true;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
      }
    }
  },
});
