// component/LoginForm.vue
<template>
  <v-form @submit.prevent="login">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="loginType"
            :items="loginTypes"
            label="Login Type"
            required
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="identifier"
            :label="
              loginType === 'email'
                ? 'อีเมล์'
                : loginType === 'national_id'
                ? 'หมายเลขบัตรประชาชน'
                : 'หมายเลขโทรศัพท์'
            "
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="formData.password"
            label="รหัสผ่าน"
            type="password"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" color="primary">เข้าสู่ระบบ</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useApi } from "~/composables/useApi";

const authStore = useAuthStore();

const formData = ref({
  password: "",
});

const loginTypes = ["email", "national_id", "phone_number"];
const loginType = ref("email"); // ค่าเริ่มต้นเป็น email
const identifier = ref(""); // ใช้สำหรับเก็บ email, national_id, หรือ phone_number

const login = async () => {
  try {
    const credentials = {
      password: formData.value.password,
    };
    credentials[loginType.value] = identifier.value; // เพิ่ม identifier ตาม loginType ที่เลือก

    const { data, error } = await useApi("token/", {
      method: "POST",
      body: credentials,
    });

    if (error) {
      // จัดการข้อผิดพลาด
      console.error(error);
      // แสดง error message ให้ผู้ใช้ทราบ (อาจใช้ Snackbar หรือวิธีอื่นๆ)
    } else {
      // ล็อกอินสำเร็จ
      authStore.login(data);
      //console.log(data)
      // เปลี่ยนเส้นทางไปยังหน้าอื่น หรือทำสิ่งอื่นๆ ตามต้องการ
      navigateTo("/");
    }
  } catch (error) {
    // จัดการข้อผิดพลาดทั่วไป
    console.error(error);
    // แสดง error message ให้ผู้ใช้ทราบ
  }
};
</script>
