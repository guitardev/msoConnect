// plugins/vuetify.ts

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
// ถ้าคุณมี custom icons ให้ import ที่นี่
// import { customIcons } from '@/helpers/customIcons'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia() // สร้าง instance ของ Pinia
  nuxtApp.vueApp.use(pinia) // ติดตั้ง Pinia ก่อน
  const vuetify = createVuetify({
    components,
    directives,
    
    // ถ้าคุณมี custom icons ให้เพิ่มที่นี่
    icons: {
      defaultSet: 'mdi', // หรือชื่อของ icon set ที่คุณต้องการใช้เป็น default
    },
    ssr: true, // เปิดใช้งาน SSR สำหรับ Vuetify
  })

  nuxtApp.vueApp.use(vuetify)
})
