import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import type { Poli } from '@/types/Poli'

export const usePoliStore = defineStore('Poli', () => {
  // Store untuk data poli
  const poliList = ref<Poli[]>([])

  // Fungsi untuk mengambil data pol
  const getAllPoli = async () => {
    const { data } = await supabase.from('poli').select('*')
    poliList.value = data as Poli[]
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
