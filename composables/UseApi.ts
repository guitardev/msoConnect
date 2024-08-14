// composables/useApi.ts

import { useRuntimeConfig } from '#app';
import { useAuthStore } from '~/stores/auth';

export const useApi:any = async (url:any, options = {}) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const authStore = useAuthStore();
  

  // เพิ่ม headers เฉพาะเมื่อมี accessToken
  if (authStore.access) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authStore.access}` 
    };
  }

  try {
    const response = await $fetch(baseUrl + url, options);
    return { data: response };
  } catch (error: any) { // ใช้ type assertion เพื่อบอกว่า error เป็น object ใดๆ
    if (error.response) {
      const statusCode = error.response.status;
      const errorData = await error.response.json().catch(() => ({}));

      console.error(`API Error (${statusCode}):`, errorData);

      // ตัวอย่างการจัดการ error บางกรณี
      switch (statusCode) {
        case 400: // Bad Request
          alert("ข้อมูลที่คุณกรอกไม่ถูกต้อง โปรดตรวจสอบอีกครั้ง"); 
          break;
        case 401: // Unauthorized
          const refreshSuccess = await authStore.refreshToken();
          if (refreshSuccess) {
            return useApi(url, options); 
          } else {
            authStore.logout();
            alert('เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง');
            return navigateTo('/login');
          }
        case 403: // Forbidden
          alert("คุณไม่ได้รับอนุญาตให้เข้าถึงข้อมูลนี้");
          break;
        case 404: // Not Found
          alert("ไม่พบข้อมูลที่คุณต้องการ");
          break;
        case 500: // Internal Server Error
          alert("เกิดข้อผิดพลาดของเซิร์ฟเวอร์ โปรดลองอีกครั้งภายหลัง");
          break;
        default:
          alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ");
    } else {
      console.error('Error:', error.message);
      alert("เกิดข้อผิดพลาด โปรดลองอีกครั้งภายหลัง");
    }

    return { error };
  }
};
