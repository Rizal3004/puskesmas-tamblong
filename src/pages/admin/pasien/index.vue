<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import formatDate from '@/utils/formatDate'
import { usePatientsStore } from '@/stores/patientsStore'
import DeleteDialog from '@/components/Pasien/DeleteDialog.vue'
import MaterialSymbolsEdit from '~icons/material-symbols/edit'

const { patientsList } = storeToRefs(usePatientsStore())
const { deletePatientByAuthId } = usePatientsStore()

const searchText = ref('')

const pasienList2 = computed(() => {
  return patientsList.value.filter((pasien) => {
    return pasien.name?.toLowerCase().includes(searchText.value.toLowerCase())
  })
})
async function handleDelete(authId: string) {
  console.log(authId)
  // await axiosInstance.delete(`/patients/${pasienId}`)
  // fetchData()
  await deletePatientByAuthId(authId)
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Pasien</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label htmlFor="search">Cari Pasien:</label>
          <input v-model="searchText" class="rounded-md px-2 py-0.5 border mx-2" type="text">
        </div>
        <!-- <a href="/admin/doctors/create" class="bg-green-200 rounded-md px-2 py-0.5">Tambah Dokter</a> -->
      </div>
    </div>
    <div class="border rounded-md px-2 pb-3">
      <table class="w-full border-spacing-x-6 border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama</th>
            <th class="text-start">NIK</th>
            <th class="text-start">Alamat</th>
            <th class="text-start">No Telp</th>
            <th class="text-start">Email</th>
            <th class="text-start">Tanggal Lahir</th>
            <th class="text-start" />
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="h-1">
            <td colSpan="9" />
          </tr>
          <tr v-for="pasien in pasienList2" :key="pasien.id">
            <td class="text-start">{{ pasien.id }}</td>
            <td class="text-start">{{ pasien.name }}</td>
            <td class="text-start">{{ pasien.nik }}</td>
            <td class="text-start">{{ pasien.address }}</td>
            <td class="text-start">{{ pasien.phone }}</td>
            <!-- <td class="text-start">{{ pasien.email }}</td> -->
            <td class="text-start">
              <template v-if="pasien.birthdate">
                {{ pasien.birthdate }}
              </template>
            </td>
            <td class="text-start">
              <div class="flex items-center gap-2 pl-10">
                <RouterLink :to="`/admin/pasien/${pasien.id}/update`">
                  <MaterialSymbolsEdit />
                </RouterLink>
                <abbr title="Hapus Pasien">
                  <DeleteDialog :pasienId="pasien.id" @delete="() => handleDelete(pasien.id.toString())" />
                </abbr>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
