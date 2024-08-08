<template>
  <default-layout> </default-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default", // สืบทอดจาก default layout
  middleware: "auth", // เพิ่ม middleware เพื่อตรวจสอบการล็อกอิน
});
</script>
