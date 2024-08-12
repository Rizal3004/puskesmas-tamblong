<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'

const { sendOtp, verifyOtp } = useAuthStore()

const OTPSent = ref(false)
const email = ref('')
async function handleSendOTP() {
  // Send OTP to email
  sendOtp(email.value)

  OTPSent.value = true
}

const OTP = ref('')
const isLoadingVerifyOTP = ref(false)
async function handleVerifyOTP() {
  isLoadingVerifyOTP.value = true
  await verifyOtp(email.value, OTP.value)
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <p v-if="isLoadingVerifyOTP">Memverifikasi...</p>
    <form v-else-if="!OTPSent" class="w-4/12" @submit.prevent="handleSendOTP">
      <p>Masukkan email anda</p>
      <div class="flex flex-col gap-2">
        <input type="text" class="border px-2 py-1">
        <button type="submit" class="bg-blue-200 py-1 w-full">
          Kirim OTP
        </button>
      </div>
    </form>
    <form v-else class="w-4/12" @submit.prevent="handleVerifyOTP">
      <p>Masukkan OTP yang dikirim ke email anda</p>
      <div class="flex flex-col gap-2">
        <input type="text" class="border px-2 py-1">
        <button type="submit" class="bg-blue-200 py-1 w-full">
          Verifikasi
        </button>
      </div>
    </form>
  </div>
</template>
