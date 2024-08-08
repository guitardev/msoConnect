// stores/auth.js

import { defineStore } from 'pinia'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'vue-router' // สำหรับการ redirect

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false, // เพิ่ม state สำหรับติดตามสถานะการโหลด
    error: null 
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, 
  },
  actions: {
    async login(identifierType, identifier, password) {
      this.loading = true; // เริ่มการโหลด
      this.error = null; // ล้าง error ก่อนหน้า

      try {
        const response = await useNuxtApp().$axios.post('/token/', {
          [identifierType]: identifier, 
          password
        })

        this.token = response.data.access;
        this.user = jwt_decode(this.token); 

        localStorage.setItem('token', this.token);

        // Redirect หลังจาก login สำเร็จ (คุณอาจต้องปรับแต่งเส้นทาง)
        const router = useRouter();
        router.push('/'); 

      } catch (error) {
        this.error = error.response?.data?.detail || 'เกิดข้อผิดพลาดในการล็อกอิน'; // เก็บข้อความ error
        console.error('Login failed:', error);
      } finally {
        this.loading = false; // หยุดการโหลด
      }
    },

    async register(email, password, firstName, lastName) {
      this.loading = true;
      this.error = null;

      try {
        const response = await useNuxtApp().$axios.post('/users/', { // เปลี่ยนเป็น /users/ ตาม router
          email,
          password,
          first_name: firstName,
          last_name: lastName
        })

        // หลังจาก register สำเร็จ คุณอาจต้องการ login ผู้ใช้โดยอัตโนมัติ หรือ redirect ไปยังหน้า login
        // await this.login('email', email, password); 

        return response.data;
      } catch (error) {
        this.error = error.response?.data?.detail || 'เกิดข้อผิดพลาดในการลงทะเบียน';
        console.error('Registration failed:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');

      // Redirect หลังจาก logout (คุณอาจต้องปรับแต่งเส้นทาง)
      const router = useRouter();
      router.push('/login');
    },

    async getUserProfile() {
      // ... (เพิ่ม logic สำหรับดึงข้อมูล profile จาก API)
    }
  }
})
