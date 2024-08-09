// composables/useApi.js

import { useRuntimeConfig } from '#app';

export const useApi = async (url, options = {}) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl; // สมมติว่าคุณกำหนด apiBaseUrl ใน runtime config

  try {
    const response = await $fetch(baseUrl + url, options);
    return { data: response };
  } catch (error) {
    return { error };
  }
};
