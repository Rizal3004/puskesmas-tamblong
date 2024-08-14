import { defineStore } from 'pinia'
import type { Poli } from '@/types/Poli'
import apiFetch from '@/ofetch'

export const usePoliStore = defineStore('Poli', () => {
  // Store untuk data poli
  const poliList = ref<Poli[]>([])

  // Fungsi untuk mengambil data pol
  const getAllPoli = async () => {
    // const { data } = await supabase.from('poli').select('*')
    const { poli } = await apiFetch<{poli: Poli[]}>('/poli')
    poliList.value = poli
  }

  const getPoliById = (id: number) => {
    return poliList.value.find(poli => poli.id === id)
  }

  return {
    poliList,
    getAllPoli,
    getPoliById,
  }
})
