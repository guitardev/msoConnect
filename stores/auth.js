// stores/auth.js

import { defineStore } from 'pinia'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
  },
  actions: {
    async login(identifierType, identifier, password) {
      try {
        const response = await axios.post('/api/token/', {
          [identifierType]: identifier, 
          password
        })

        this.token = response.data.access;
        this.user = jwt_decode(this.token); // ถอดรหัส JWT เพื่อดึงข้อมูลผู้ใช้

        // เก็บ token ใน local storage (หรือวิธีอื่นๆ ตามที่คุณต้องการ)
        localStorage.setItem('token', this.token);

        return response.data; // ส่งคืนข้อมูล response หากต้องการใช้ใน component
      } catch (error) {
        // จัดการ error เช่น แสดงข้อความ error ให้ผู้ใช้
        console.error('Login failed:', error);
        throw error; // ส่ง error ต่อเพื่อให้ component ที่เรียกใช้สามารถจัดการได้
      }
    },

    async register(email, password, firstName, lastName) {
      try {
        const response = await axios.post('/api/users/register/', {
          email,
          password,
          first_name: firstName,
          last_name: lastName
        })

        // หลังจาก register สำเร็จ คุณอาจต้องการ login ผู้ใช้โดยอัตโนมัติ หรือ redirect ไปยังหน้า login
        // await this.login('email', email, password); 

        return response.data; // ส่งคืนข้อมูล response หากต้องการใช้ใน component
      } catch (error) {
        // จัดการ error เช่น แสดงข้อความ error ให้ผู้ใช้
        console.error('Registration failed:', error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },

    // เพิ่ม actions อื่นๆ ตามต้องการ เช่น getUserProfile
  }
})
