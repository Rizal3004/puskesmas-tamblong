<script lang="ts" setup>
import { useRouter } from 'vue-router'
import validateInputNumber from '@/utils/validateInputNumber'
import { usePoliStore } from '@/stores/poliStore'
import { useDoctorStore } from '@/stores/doctorStore'
import type { DoctorForm } from '@/types/Doctor'

const { getDoctorById, updateDoctor } = useDoctorStore()
const { poliList } = usePoliStore()
const router = useRouter()
const route = useRoute()
const dokterId = Number((route.params as object as { id: string }).id)

const dokterFormData = reactive<Partial<DoctorForm>>({
  name: '',
  poli_id: undefined,
  jam_kerja_start: '',
  jam_kerja_end: '',
  email: '',
  phone: '',
  imageFile: undefined,
})

function photoChange(e: Event) {
  dokterFormData.imageFile = (e.target as HTMLInputElement)?.files![0]
}

async function handleSubmit() {
  updateDoctor(dokterId, dokterFormData)
}

onMounted(() => {
  const dokter = getDoctorById(dokterId)
  if (!dokter) return
  dokterFormData.name = dokter.name!
  dokterFormData.poli_id = dokter.poli_id!
  dokterFormData.jam_kerja_start = dokter.jam_kerja_start!
  dokterFormData.jam_kerja_end = dokter.jam_kerja_end!
  dokterFormData.email = dokter.email!
  dokterFormData.phone = dokter.phone!
  console.log(dokterFormData)
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
    Edit Data Dokter
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-y-2 gap-x-5" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label>Nama</label>
        <input
          v-model="dokterFormData.name"
          placeholder="Nama Dokter"
          type="text"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Spesialis</label>
        <select
          v-model="dokterFormData.poli_id"
          placeholder="Pilih Poli"
          label="Poli"
          class="border py-1 px-3 rounded-md"
        >
          <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label>Jam mulai kerja</label>
        <input
          v-model="dokterFormData.jam_kerja_start"
          type="time"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Jam berakhir kerja</label>
        <input
          v-model="dokterFormData.jam_kerja_end"
          type="time"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Email</label>
        <input
          v-model="dokterFormData.email"
          type="email"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>No Telp</label>
        <input
          v-model="dokterFormData.phone"
          type="text"
          class="border py-1 px-3 rounded-md"
          @keypress="validateInputNumber"
        >
      </div>
      <div class="flex flex-col">
        <label>Foto</label>
        <input
          type="file"
          multiple="false"
          accept="image/jpeg, image/jpg, image/png"
          class="border py-1 px-3 rounded-md"
          @change="photoChange"
        >
      </div>
      <div class="flex items-end">
        <button type="submit" class="w-full h-10 bg-blue-400 rounded-md text-white">Submit</button>
      </div>
    </form>
  </div>
</template>
