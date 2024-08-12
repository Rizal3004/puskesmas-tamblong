<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import SolarLetterLinear from '~icons/solar/letter-linear'
import SolarLockPasswordLinear from '~icons/solar/lock-password-linear'
import SolarUserRoundedLinear from '~icons/solar/user-rounded-linear'
import SolarCardOutline from '~icons/solar/card-outline'
import type { PatientForm } from '@/types/Patient'
import { useAuthStore } from '@/stores/authStore'

const { signup } = useAuthStore()
const toast = useToast()

const formDataRegister = reactive<PatientForm>({
  name: '',
  nik: '',
  email: '',
  password: '',
})
const passwordConfirmation = ref('')

function validateForm() {
  if (formDataRegister.password !== passwordConfirmation.value) {
    toast.error('Password tidak sama')
    return false
  } else if (formDataRegister.password.length < 8) {
    toast.error('Password minimal 8 karakter')
    return false
  } else if (formDataRegister.nik!.length !== 16) {
    toast.error('NIK harus 16 karakter')
    return false
  }
  return true
}

async function handleRegister() {
  if (!validateForm()) return
  await signup(formDataRegister)
}
</script>

<template>
  <div class="h-screen grid md:grid-cols-2">
    <div class="bg-slate-700 hidden md:block h-screen overflow-hidden">
      <img src="/images/image2.jpg" alt="">
    </div>
    <div class="md:px-44 px-6 flex flex-col gap-8 justify-center relative">
      <div class="*:text-center space-y-2">
        <h1 class="text-4xl font-bold text-slate-900">
          Daftar
        </h1>
        <p class="text-slate-500">
          Masukkan data anda untuk daftar
        </p>
      </div>
      <div class="">
        <form class="flex flex-col gap-3" @submit.prevent="handleRegister">
          <abbr title="Nama lengkap">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
              <SolarUserRoundedLinear />
              <input
                v-model="formDataRegister.name"
                required
                class="w-full bg-transparent focus:outline-none"
                type="text"
                placeholder="Masukkan nama lengkap"
              >
            </label>
          </abbr>
          <abbr title="NIK">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
              <SolarCardOutline />
              <input
                v-model="formDataRegister.nik"
                required
                class="w-full bg-transparent focus:outline-none"
                type="text"
                placeholder="Masukkan NIK"
              >
            </label>
          </abbr>
          <abbr title="Email">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
              <SolarLetterLinear />
              <input
                v-model="formDataRegister.email"
                required
                class="w-full bg-transparent focus:outline-none"
                type="email"
                placeholder="Masukkan email"
              >
            </label>
          </abbr>
          <abbr title="Password">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
              <SolarLockPasswordLinear />
              <input
                v-model="formDataRegister.password"
                required
                class="w-full bg-transparent focus:outline-none"
                type="password"
                placeholder="Masukkan password"
              >
            </label>
          </abbr>
          <abbr title="Konfirmasi Password">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
              <SolarLockPasswordLinear />
              <input
                v-model="passwordConfirmation"
                required
                class="w-full bg-transparent focus:outline-none"
                type="password"
                placeholder="Masukkan password"
              >
            </label>
          </abbr>
          <button type="submit" class="bg-sky-500 w-full text-white py-1.5 rounded-md">Daftar</button>
        </form>
      </div>
      <RouterLink to="/auth/login" class="px-6 py-1 hover:bg-slate-100 w-fit rounded-md font-semibold absolute top-6 right-6">Login</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
