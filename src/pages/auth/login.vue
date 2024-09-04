<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import SolarLetterLinear from '~icons/solar/letter-linear'
import SolarLockPasswordLinear from '~icons/solar/lock-password-linear'
import { useAuthStore } from '@/stores/authStore'
import SolarEyeClosedLinear from '~icons/solar/eye-closed-linear'
import SolarEyeLinear from '~icons/solar/eye-linear'

const { login } = useAuthStore()

const loginData = ref<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})

const showPassword = ref(false)

async function handleLogin() {
  await login(loginData.value)
}
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="grid w-8/12 overflow-hidden rounded-2xl border shadow-lg sm:grid-cols-2">
      <div class="relative flex flex-col items-start justify-center gap-8 px-6 md:px-16">
        <div class="space-y-2 *:text-start">
          <h1 class="text-4xl font-bold text-sky-500">
            Login
          </h1>
          <!-- <p class="text-slate-500">
            Welcome back! Please login to your account.
          </p> -->
        </div>
        <div class="w-full">
          <form class="flex w-full flex-col gap-3" @submit.prevent="handleLogin">
            <abbr title="Email" class="w-full">
              <label class="selection:color-white inline-flex w-full items-center gap-3 border-b py-2">
                <SolarLetterLinear />
                <input
                  v-model="loginData.email"
                  required
                  class="w-full bg-transparent focus:outline-none"
                  type="email"
                  placeholder="Masukkan email"
                >
              </label>
            </abbr>
            <abbr title="Password" class="w-full">
              <label class="selection:color-white inline-flex w-full items-center gap-3 border-b py-2">
                <SolarLockPasswordLinear />
                <input
                  v-model="loginData.password"
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
            <div class="flex justify-end">
              <!-- <RouterLink to="/auth/forget-password" class="text-sm text-slate-600">Lupa Password</RouterLink> -->
            </div>
            <button type="submit" class="w-full rounded-md bg-zinc-700 py-1.5 text-white">Login</button>
          </form>
        </div>

        <div class="">
          <p>
            Belum punya akun? 
            <RouterLink to="/auth/register" class="text-sky-500">Daftar</RouterLink>
          </p>
          <p>
            Butuh pemesanan darurat? 
            <RouterLink to="/booking-darurat" class="text-sky-500">Pesan Darurat</RouterLink>
          </p>
        </div>
      </div>
      <div class="hidden size-full overflow-hidden bg-slate-700 md:block">
        <img src="/images/image1.jpg" alt="" class="w-full object-cover object-center">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
