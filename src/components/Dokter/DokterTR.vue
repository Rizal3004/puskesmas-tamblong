<script lang="ts" setup>
import DeleteDialog from './DeleteDialog.vue'
import { usePoliStore } from '@/stores/poliStore'
import type { Doctor } from '@/types/Doctor'
import apiFetch, { baseURL } from '@/ofetch'
import { useDoctorStore } from '@/stores/doctorStore'
import MaterialSymbolsEdit from '~icons/material-symbols/edit'

const props = defineProps<{
  dokter: Doctor
}>()
const { deleteDoctor } = useDoctorStore()
const { getPoliById } = usePoliStore()
async function handleDelete(dokterId: number) {
  await deleteDoctor(dokterId)
}

const imgSrc = ref<string>('')

async function getImgSrc() {
  const data = await apiFetch<string>(`/doctors/image/${props.dokter.id}`, {
    onResponseError: (error) => {
      console.error(error)
    },
  })

  // imgSrc.value = data as unknown as string
  imgSrc.value = `data:image/png;base64,${data}`
}

onMounted(() => {
  getImgSrc()
})
</script>

<template>
  <tr>
    <td class="text-start">{{ dokter.id }}</td>
    <td class="text-start">{{ dokter.name }}</td>
    <td class="text-start">{{ getPoliById(dokter.poli_id)?.name }}</td>
    <td class="text-start">{{ dokter.jam_kerja_start }}</td>
    <td class="text-start">{{ dokter.jam_kerja_end }}</td>
    <td class="text-start">{{ dokter.phone }}</td>
    <td class="text-start">{{ dokter.email }}</td>
    <td class="text-start">
      <img :src="`${baseURL}doctors/image/${dokter.id}`" alt="Foto dokter" class="aspect-video w-16 object-cover">
    </td>
    <td class="text-start">
      <div class="flex items-center gap-2 pl-10">
        <RouterLink :to="`/admin/dokter/${dokter.id}/update`">
          <MaterialSymbolsEdit class="text-amber-500" />
        </RouterLink>
        <DeleteDialog :dokterId="dokter.id" @delete="handleDelete" />
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
