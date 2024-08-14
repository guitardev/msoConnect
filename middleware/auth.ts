// middleware/auth.ts
import { useAuthStore } from '~/stores/auth'; // หรือ path ไปยังไฟล์ store ของคุณ
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      // Redirect to login if the route requires auth and user is not logged in
      return navigateTo('/login');
    } else {
      // If the user is logged in but the user data hasn't been fetched yet, fetch it
      if (!authStore.user) {
        try {
          await authStore.fetchUserProfile();
        } catch (error) {
          // Handle error if fetching user profile fails (e.g., token expired)
          console.error('Error fetching user profile in middleware:', error);
          authStore.logout(); // Log the user out if there's an error
          return navigateTo('/login');
        }
      }
    }
  } else if (to.path === '/login' && authStore.isLoggedIn) {
    // Redirect to profile if the user is already logged in and tries to access the login page
    return navigateTo('/profile');
  }
});
