// pages/index.vue

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">ยินดีต้อนรับสู่ MSO Connect</h1>
        <p>
          นี่คือหน้าหลักของแอปพลิเคชันของคุณ คุณสามารถเริ่มสร้างเนื้อหาและฟีเจอร์ต่างๆ ได้ที่นี่
        </p>
        <v-btn color="primary">Click me!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const drawer = ref(false);

    return {
      drawer
    };
  }
}
</script>
