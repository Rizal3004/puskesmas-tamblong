<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import SolarArrowLeftLinear from '~icons/solar/arrow-left-linear'
import SolarPen2BoldDuotone from '~icons/solar/pen-2-bold-duotone'
import SolarCloseSquareLineDuotone from '~icons/solar/close-square-line-duotone'
import SolarCheckSquareLineDuotone from '~icons/solar/check-square-line-duotone'
import Header from '@/components/Header.vue'
import validateInputNumber from '@/utils/validateInputNumber'

const { changeAddress, changePhone, changePassword, changeEmail, logout } = useAuthStore()
const { profile } = storeToRefs(useAuthStore())
const router = useRouter()

const isEditEmail = ref(false)
const emailEl = ref<HTMLInputElement | null>(null)
const emailText = ref('')
async function handleChangeEmail() {
  const confirmChange = confirm('Apakah anda yakin ingin mengubah email?')
  if (confirmChange) {
    await changeEmail(emailText.value)
    alert('Email berhasil diubah')
  } else {
    emailText.value = profile.value?.email ?? ''
  }
  isEditEmail.value = false
}

const isEditAddress = ref(false)
const addressEl = ref<HTMLInputElement | null>(null)
const addressText = ref(profile.value?.address ?? '')
async function handleChangeAddress() {
  const confirmChange = confirm('Apakah anda yakin ingin mengubah alamat?')
  if (confirmChange) {
    changeAddress(addressText.value)
    alert('Alamat berhasil diubah')
  } else {
    addressText.value = profile.value?.address ?? ''
  }
  isEditAddress.value = false
}
const isEditPhone = ref(false)
const phoneEl = ref<HTMLInputElement | null>(null)
const phoneText = ref(profile.value?.phone ?? '')
async function handleChangePhone() {
  const confirmChange = confirm('Apakah anda yakin ingin mengubah nomor telepon?')
  if (confirmChange) {
    changePhone(phoneText.value)
    alert('Nomor telepon berhasil diubah')
  } else {
    phoneText.value = profile.value?.phone ?? ''
  }
  isEditPhone.value = false
}
const isEditPassword = ref(false)
const passwordEl = ref<HTMLInputElement | null>(null)
const passwordText = ref(profile.value?.password ?? '')
async function handleChangePassword() {
  const confirmChange = confirm('Apakah anda yakin ingin mengubah password?')
  if (confirmChange) {
    changePassword(passwordText.value)
    alert('Password berhasil diubah')
  } else {
    passwordText.value = profile.value?.password ?? ''
  }
  isEditPassword.value = false
}

function handleLogout() {
  const confirmLogout = confirm('Apakah anda yakin ingin logout?')

  if (!confirmLogout) return
  logout()
  router.push('/auth/login')
}

onMounted(() => {
  emailText.value = profile.value?.email ?? ''
  addressText.value = profile.value?.address ?? ''
  phoneText.value = profile.value?.phone ?? ''
  passwordText.value = profile.value?.password ?? ''
})
</script>

<template>
  <Header />
  <div class="space-y-3 px-6 py-4 md:px-36">
    <RouterLink to="/" class="hidden w-fit items-center gap-3 rounded-md px-3.5 py-1 text-slate-700 transition-all duration-500 hover:bg-slate-100 md:flex">
      <SolarArrowLeftLinear class="" />
      <span class="">Kembali</span>
    </RouterLink>
    <h1 class="text-2xl font-semibold">Profil</h1>
    <table v-if="profile" class="w-8/12 [&>*>*]:border [&>*>*]:px-2 [&>*>*]:text-start">
      <!-- <tr>
        <th>ID</th>
        <td>{{ profile.id }}</td>
      </tr> -->
      <tr>
        <th>Nama</th>
        <td>{{ profile.name }}</td>
      </tr>
      <tr>
        <th>NIK</th>
        <td>{{ profile.nik }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>
          <div v-if="!isEditEmail" class="flex justify-between">
            <p>
              {{ profile.email ?? 'Belum diatur' }}
            </p>
            <button @click="isEditEmail = true">
              <SolarPen2BoldDuotone class="text-orange-400" />
            </button>
          </div>
          <div v-else class="flex justify-between p-1">
            <input
              ref="emailEl"
              v-model="emailText"
              type="email"
              class="w-full border p-1"
              placeholder="Masukkan email baru anda"
            >
            <div class="flex gap-3">
              <button @click="isEditEmail = false">
                <SolarCloseSquareLineDuotone class="text-red-400" />
              </button>
              <button @click="handleChangeEmail">
                <SolarCheckSquareLineDuotone class="text-green-400" />
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Alamat</th>
        <td>
          <div v-if="!isEditAddress" class="flex justify-between">
            <p>
              {{ profile.address ?? 'Belum diatur' }}
            </p>
            <button @click="isEditAddress = true">
              <SolarPen2BoldDuotone class="text-orange-400" />
            </button>
          </div>
          <div v-else class="flex justify-between p-1">
            <input
              ref="addressEl"
              v-model="addressText"
              type="text"
              class="w-full border p-1"
              placeholder="Masukkan alamat baru anda"
            >
            <div class="flex gap-3">
              <button @click="isEditAddress = false">
                <SolarCloseSquareLineDuotone class="text-red-400" />
              </button>
              <button @click="handleChangeAddress">
                <SolarCheckSquareLineDuotone class="text-green-400" />
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>No Telepon</th>
        <td>
          <div v-if="!isEditPhone" class="flex justify-between">
            <p>
              {{ profile.phone ?? 'Belum diatur' }}
            </p>
            <button @click="isEditPhone = true">
              <SolarPen2BoldDuotone class="text-orange-400" />
            </button>
          </div>
          <div v-else class="flex justify-between p-1">
            <input
              ref="phoneEl"
              v-model="phoneText"
              type="text"
              class="w-full border p-1"
              placeholder="Masukkan nomor baru anda"
              @keypress="validateInputNumber"
            >
            <div class="flex gap-3">
              <button @click="isEditPhone = false">
                <SolarCloseSquareLineDuotone class="text-red-400" />
              </button>
              <button @click="handleChangePhone">
                <SolarCheckSquareLineDuotone class="text-green-400" />
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Tanggal Lahir</th>
        <td>
          <p>
            {{ profile.birthdate ?? 'Belum diatur' }}
          </p>
        </td>
      </tr>
      <tr>
        <th>Password</th>
        <td>
          <div v-if="!isEditPassword" class="flex justify-between">
            <p>
              *********
            </p>
            <button @click="isEditPassword = true">
              <SolarPen2BoldDuotone class="text-orange-400" />
            </button>
          </div>
          <div v-else class="flex justify-between p-1">
            <input
              ref="passwordEl"
              v-model="passwordText"
              type="text"
              class="w-full border p-1"
              placeholder="Masukkan password baru anda"
            >
            <div class="flex gap-3">
              <button @click="isEditPassword = false">
                <SolarCloseSquareLineDuotone class="text-red-400" />
              </button>
              <button @click="handleChangePassword">
                <SolarCheckSquareLineDuotone class="text-green-400" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <div class="flex gap-5">
      <button class="rounded-md bg-red-500 px-3 py-1 text-white" @click="handleLogout">Logout</button>
      <RouterLink to="/profile/riwayat" class="rounded-md border border-zinc-400 bg-zinc-100 px-3 py-1">Riwayat berobat</RouterLink>
    </div>
  </div>
</template>

<style scoped>
th {
  width: 1%;
  white-space: nowrap;
}
</style>
