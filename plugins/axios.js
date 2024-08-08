// plugins/axios.js

import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api/' // URL ของ Backend API ใน production
    : 'http://localhost:8000/api/' // URL ของ Backend API ใน development

  nuxtApp.provide('axios', axios.create({ baseURL }))
})
