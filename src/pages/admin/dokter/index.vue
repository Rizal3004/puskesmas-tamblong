<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDoctorStore } from '@/stores/doctorStore'
import DokterTR from '@/components/Dokter/DokterTR.vue'

const { doctorList } = storeToRefs(useDoctorStore())
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Dokter</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label htmlFor="search">Cari Dokter:</label>
          <input id="search" class="rounded-md px-2 py-0.5 border mx-2" type="text">
        </div>
        <RouterLink to="/admin/dokter/create" href="/admin/doctors/create" class="bg-green-200 rounded-md px-2 py-0.5">Tambah Dokter</RouterLink>
      </div>
    </div>
    <div class="border rounded-md px-2 pb-3">
      <table class="w-full border-spacing-x-6 border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama Dokter</th>
            <th class="text-start">Spesialis</th>
            <th class="text-start">Jam mulai kerja</th>
            <th class="text-start">Jam selesai kerja</th>
            <th class="text-start">No Telp</th>
            <th class="text-start">Email</th>
            <th class="text-start">Foto</th>
            <th class="text-start" />
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="h-1">
            <td colSpan="9" />
          </tr>
          <DokterTR :dokter v-for="dokter in doctorList" :key="dokter.id" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
