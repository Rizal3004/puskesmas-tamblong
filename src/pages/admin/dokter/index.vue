<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import MaterialSymbolsLightEditSquareRounded from '~icons/material-symbols-light/edit-square-rounded'
import DeleteDialog from '@/components/Dokter/DeleteDialog.vue'

const { doctorList } = storeToRefs(useDoctorStore())
const { deleteDoctor } = useDoctorStore()
const { getPoliById } = usePoliStore()
async function handleDelete(dokterId: number) {
  await deleteDoctor(dokterId)
}
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
          <tr v-for="dokter in doctorList" :key="dokter.id">
            <td class="text-start">{{ dokter.id }}</td>
            <td class="text-start">{{ dokter.name }}</td>
            <td class="text-start">{{ getPoliById(dokter.poli_id)?.name }}</td>
            <td class="text-start">{{ dokter.jam_kerja_start }}</td>
            <td class="text-start">{{ dokter.jam_kerja_end }}</td>
            <td class="text-start">{{ dokter.phone }}</td>
            <td class="text-start">{{ dokter.email }}</td>
            <td class="text-start">
              <img :src="dokter.imgUrl" alt="Foto dokter" class="w-16 aspect-video object-cover">
            </td>
            <td class="text-start">
              <div class="flex items-center gap-2 pl-10">
                <RouterLink :to="`/admin/dokter/${dokter.id}/update`">
                  <MaterialSymbolsLightEditSquareRounded />
                </RouterLink>
                <DeleteDialog :dokterId="dokter.id" @delete="handleDelete" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
