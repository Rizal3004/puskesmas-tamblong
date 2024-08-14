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
  email: 'asep@example.com',
  password: 'admin001',
})

const showPassword = ref(false)

async function handleLogin() {
  await login(loginData.value)
}
</script>

<template>
  <div class="h-screen grid sm:grid-cols-2">
    <div class="bg-slate-700 hidden md:block h-screen overflow-hidden">
      <img src="/images/image1.jpg" alt="">
    </div>
    <div class="px-6 md:px-44 flex flex-col gap-8 justify-center relative">
      <div class="*:text-center space-y-2">
        <h1 class="text-4xl font-bold text-slate-900">
          Masuk
        </h1>
        <p class="text-slate-500">
          Welcome back! Please login to your account.
        </p>
      </div>
      <div class="">
        <form class="flex flex-col gap-3" @submit.prevent="handleLogin">
          <abbr title="Email">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
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
          <abbr title="Password">
            <label class="bg-blackA5/5 text-black shadow-blackA9 gap-2 inline-flex py-2 appearance-none items-center justify-start rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 w-full">
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
          <button type="submit" class="bg-sky-500 w-full text-white py-1.5 rounded-md">Login</button>
        </form>
      </div>
      <RouterLink to="/auth/register" class="px-6 py-1 hover:bg-slate-100 w-fit rounded-md font-semibold absolute top-6 right-6">Daftar</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
