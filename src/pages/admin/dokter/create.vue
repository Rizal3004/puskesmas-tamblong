<script lang="ts" setup>
import { useToast } from 'vue-toast-notification'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import type { DoctorForm } from '@/types/Doctor'
import validateInputNumber from '@/utils/validateInputNumber'

const router = useRouter()
const { createDoctor } = useDoctorStore()
const { poliList } = usePoliStore()

const toast = useToast()

const isLoading = ref(false)

const dokterData = reactive<DoctorForm>({
  name: '',
  poli_id: 0,
  jam_kerja_start: '',
  jam_kerja_end: '',
  email: '',
  phone: '',
  imageFile: undefined,
})

function photoChange(e: Event) {
  dokterData.imageFile = (e.target as HTMLInputElement)?.files![0]
}

async function handleSubmit() {
  if (!dokterData.imageFile) {
    return toast.error('Foto dokter harus diisi')
  }
  isLoading.value = true
  await createDoctor(dokterData)

  isLoading.value = false
  router.go(-1)
}
</script>

<template>
  <div v-if="isLoading" class="">
    Loading ...
  </div>
  <div v-else class="">
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
      Tambah Dokter
    </h1>
    <div class="">
      <form class="grid grid-cols-2 gap-y-2 gap-x-5" @submit.prevent="handleSubmit">
        <div class="flex flex-col">
          <label>Nama</label>
          <input
            v-model="dokterData.name"
            placeholder="Nama Dokter"
            type="text"
            class="border py-1 px-3 rounded-md"
          >
        </div>
        <div class="flex flex-col">
          <label>Spesialis</label>
          <select
            v-model="dokterData.poli_id"
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
            v-model="dokterData.jam_kerja_start"
            type="time"
            class="border py-1 px-3 rounded-md"
          >
        </div>
        <div class="flex flex-col">
          <label>Jam berakhir kerja</label>
          <input
            v-model="dokterData.jam_kerja_end"
            type="time"
            class="border py-1 px-3 rounded-md"
          >
        </div>
        <div class="flex flex-col">
          <label>Email</label>
          <input
            v-model="dokterData.email"
            type="email"
            class="border py-1 px-3 rounded-md"
          >
        </div>
        <div class="flex flex-col">
          <label>No Telp</label>
          <input
            v-model="dokterData.phone"
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
          <button type="submit" class="w-full h-10 bg-blue-400 rounded-md text-white"> Tambah Dokter </button>
        </div>
      </form>
    </div>
  </div>
</template>
