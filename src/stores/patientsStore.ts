import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import type { Patient } from '@/types/Patient'

export const usePatientsStore = defineStore('Patients', () => {
  const patientsList = ref<Patient[]>([])

  const getAllPatients = async () => {
    const { data } = await supabase.from('patients').select('*')
    patientsList.value = data as Patient[]
  }
  const getPatientById = (id: number) => {
    return patientsList.value.find(patient => patient.id === id)
  }

  return {
    patientsList,
    getAllPatients,
    getPatientById,
  }
})
