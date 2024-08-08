// composables/useFormRules.ts

// สร้าง custom hook สำหรับใช้กฎการตรวจสอบฟอร์ม
export const useFormRules = () => {
    // กฎ: ห้ามว่าง
    const ruleRequired = (value: any | null, [fieldName]: any[]): any | true => {
      if (!!value) {
        return true; // ถ้ามีค่า ให้ return true (ผ่านการตรวจสอบ)
      } else {
        return `กรุณากรอก ${fieldName}`; // ถ้าไม่มีค่า ให้ return error message พร้อมชื่อ field
      }
    };
    
    // กฎ: ตรวจสอบเลขบัตรประชาชน 13 หลัก
    const ruleNationalId = (value: string): string | true =>
      isValidThaiNationalID(value) || "กรุณาใส่เลขบัตรประชาชน 13 หลักที่ถูกต้อง";
  
    // กฎ: ตรวจสอบว่าเป็น username หรือ national_id ที่ถูกต้อง
    const ruleIdentifier = (value: string): string | true => {
      // ตรวจสอบว่าเป็น username หรือ national_id
      const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value); // สมมติว่า username ต้องมีความยาว 3-20 ตัวอักษร และประกอบด้วยตัวอักษร, ตัวเลข, หรือ underscore
      const isNationalId = isValidThaiNationalID(value);
  
      if (!isUsername && !isNationalId) {
        return "กรุณาใส่ชื่อผู้ใช้หรือเลขบัตรประชาชนที่ถูกต้อง";
      }
      return true;
    };
  
    // กฎ: รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และมีทั้งตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข
    const rulePassLen = (value: string): string | true => {
      if (!value || value.length < 8) {
        return "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
      }
  
      if (!/[a-z]/.test(value)) {
        return "รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว";
      }
  
      if (!/\d/.test(value)) {
        return "ต้องมีตัวเลขอย่างน้อง 1 ตัว";
      }
  
      return true;
    };
    // กฎ: ตรวจสอบรูปแบบอีเมล
    const ruleEmail = (value: string): string | true => {
      // ใช้ regular expression เพื่อตรวจสอบรูปแบบอีเมลพื้นฐาน
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || "กรุณาใส่อีเมลที่ถูกต้อง";
    };
  
    // กฎ: ตรวจสอบรูปแบบเบอร์โทรศัพท์ (ตัวอย่าง: 0xx-xxx-xxxx)
    const rulePhoneNumber = (value: string): string | true => {
      // ใช้ regular expression เพื่อตรวจสอบรูปแบบเบอร์โทรศัพท์
      const pattern = /^0\d{2}-\d{3}-\d{4}$/;
      return pattern.test(value) || "กรุณาใส่เบอร์โทรศัพท์ในรูปแบบ 0xx-xxx-xxxx";
    };
    const ruleName = (value: string): string | true => {
      const pattern = /^[a-zA-Zก-๛\s]+$/;
      return pattern.test(value) || "กรุณาใส่ชื่อที่ถูกต้อง (ภาษาไทยหรืออังกฤษ)";
    };
    // ฟังก์ชันสำหรับตรวจสอบความถูกต้องของเลขบัตรประชาชนไทย
    function isValidThaiNationalID(id: string): boolean {
      if (id.length !== 13 || !/^\d+$/.test(id)) {
        return false; // ไม่ใช่ตัวเลข 13 หลัก
      }
  
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(id.charAt(i)) * (13 - i);
      }
      const checkDigit = (11 - (sum % 11)) % 10;
      return checkDigit === parseInt(id.charAt(12));
    }
  
    return {
      ruleRequired,
      ruleNationalId,
      rulePassLen,
      rulePhoneNumber,
      ruleEmail,
      ruleName,
      ruleIdentifier
    };
  };
  