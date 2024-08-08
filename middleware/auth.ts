// middleware/auth.ts

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
  
    if (!authStore.isAuthenticated) {
      return navigateTo('/login'); // หรือไปยังหน้าอื่นๆ ตามต้องการ
    }
  });
  