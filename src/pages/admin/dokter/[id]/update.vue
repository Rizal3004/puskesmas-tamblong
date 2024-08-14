<script lang="ts" setup>
import { useRouter } from 'vue-router'
import validateInputNumber from '@/utils/validateInputNumber'
import { usePoliStore } from '@/stores/poliStore'

const { poliList } = usePoliStore()
const router = useRouter()
const route = useRoute()
const dokterId = (route.params as object as { id: number }).id

const dokterFormData = reactive<{
  nama: string
  poliId: string
  jamMulai: string
  jamSelesai: string
  email: string
  noTelp: string
  foto: File | null
}>({
  nama: '',
  poliId: '',
  jamMulai: '',
  jamSelesai: '',
  email: '',
  noTelp: '',
  foto: null,
})

function photoChange(e: Event) {
  dokterFormData.foto = (e.target as HTMLInputElement)?.files![0]
}

async function handleSubmit() {

}
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
          v-model="dokterFormData.nama"
          placeholder="Nama Dokter"
          type="text"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Spesialis</label>
        <select
          v-model="dokterFormData.poliId"
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
          v-model="dokterFormData.jamMulai"
          type="time"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Jam berakhir kerja</label>
        <input
          v-model="dokterFormData.jamSelesai"
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
          v-model="dokterFormData.noTelp"
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
</template>
