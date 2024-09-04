<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import SolarLetterLinear from '~icons/solar/letter-linear'
import SolarLockPasswordLinear from '~icons/solar/lock-password-linear'
import SolarUserRoundedLinear from '~icons/solar/user-rounded-linear'
import SolarCardOutline from '~icons/solar/card-outline'
import type { PatientForm } from '@/types/Patient'
import { useAuthStore } from '@/stores/authStore'
import SolarEyeClosedLinear from '~icons/solar/eye-closed-linear'
import SolarEyeLinear from '~icons/solar/eye-linear'
import StreamlineFoodCakeCandleBirthdayEventSpecialSweetCakeBake from '~icons/streamline/food-cake-candle-birthday-event-special-sweet-cake-bake'

const { signup } = useAuthStore()
const toast = useToast()

const formDataRegister = reactive<PatientForm>({
  name: '',
  nik: '',
  email: '',
  password: '',
  birthdate: ''
})
const passwordConfirmation = ref('')

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

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
  <div class="flex h-screen items-center justify-center">
    <div class="grid w-8/12 overflow-hidden rounded-2xl border shadow-lg sm:grid-cols-2">
      <div class="hidden overflow-hidden bg-slate-700 md:block">
        <img src="/images/image2.jpg" alt="" class="object-center">
      </div>
      <div class="relative flex flex-col justify-center gap-8 px-6 md:px-16">
        <div class="space-y-2 *:text-start">
          <h1 class="text-4xl font-bold text-sky-600">
            Daftar
          </h1>
          <!-- <p class="text-slate-500">
            Masukkan data anda untuk daftar
          </p> -->
        </div>
        <div class="">
          <form class="flex flex-col gap-3" @submit.prevent="handleRegister">
            <abbr title="Nama lengkap">
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
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
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
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
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
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
            <abbr title="Tanggal Lahir">
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
                <StreamlineFoodCakeCandleBirthdayEventSpecialSweetCakeBake />
                <input
                  v-model="formDataRegister.birthdate"
                  required
                  class="w-full bg-transparent focus:outline-none"
                  type="date"
                >
              </label>
            </abbr>
            <abbr title="Password">
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
                <SolarLockPasswordLinear />
                <input
                  v-model="formDataRegister.password"
                  required
                  class="w-full bg-transparent focus:outline-none"
                  :type="showPassword ? 'text' : 'password' "
                  placeholder="Masukkan password"
                >
                <button type="button" @click="showPassword = !showPassword">
                  <SolarEyeClosedLinear v-if="showPassword" />
                  <SolarEyeLinear v-else />
                </button>
              </label>
            </abbr>
            <abbr title="Konfirmasi Password">
              <label class="selection:color-white inline-flex w-full border-b gap-3 items-center py-2">
                <SolarLockPasswordLinear />
                <input
                  v-model="passwordConfirmation"
                  required
                  class="w-full bg-transparent focus:outline-none"
                  :type="showPasswordConfirmation ? 'text' : 'password' "
                  placeholder="Masukkan password"
                >
                <button type="button" @click="showPasswordConfirmation = !showPasswordConfirmation">
                  <SolarEyeClosedLinear v-if="showPasswordConfirmation" />
                  <SolarEyeLinear v-else />
                </button>
              </label>
            </abbr>
            <button type="submit" class="w-full rounded-md bg-zinc-700 py-1.5 text-white">Daftar</button>
          </form>
        </div>
        <p>
          Sudah punya akun? 
          <RouterLink to="/auth/login" class="text-sky-600">Login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
