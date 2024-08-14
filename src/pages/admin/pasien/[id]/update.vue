<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { usePatientsStore } from '@/stores/patientsStore'

const { getPatientById, updatePatientEmailAndPassword } = usePatientsStore()

const router = useRouter()
const route = useRoute()
const patientId = (route.params as object as { id: string }).id

const patientFormData = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})


async function handleSubmit() {
  await updatePatientEmailAndPassword({
    patientId: Number(patientId),
    email: patientFormData.email,
    password: patientFormData.password,
  })

  patientFormData.email = ''
  patientFormData.password = ''
  router.go(-1)
}

onMounted(() => {
  const patient = getPatientById(patientId)
  if (!patient) {
    router.push('/admin/pasien')
    return
  } 
  patientFormData.email = patient.email
  patientFormData.password = patient.password
})

</script>

<template>
  <button
    type="button"
    href="/admin/doctors"
    class="flex items-center gap-2 hover:bg-slate-100 px-4 py-1 rounded-xl text-sm -translate-x-10 transition-all duration-300 w-fit"
    @click="router.go(-1)"
  >
    <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
    Kembali
  </button>
  <h1 class="text-2xl font-semibold">
    Edit Data Pasien
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-y-2 gap-x-5" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label>Email</label>
        <input
          v-model="patientFormData.email"
          type="email"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Password</label>
        <input
          v-model="patientFormData.password"
          type="password"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex items-end">
        <button type="submit" class="w-full h-10 bg-blue-400 rounded-md text-white"> Edit Pasien </button>
      </div>
    </form>
  </div>
</template>
