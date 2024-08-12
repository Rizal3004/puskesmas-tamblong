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

  const deletePatientByAuthId = async (authId: string) => {
    const { error } = await supabase.auth.admin.deleteUser(authId)
    if (error) {
      console.log(error)
      return
    }

    await supabase.from('patients').delete().eq('user_id', authId)

    patientsList.value = patientsList.value.filter((patient) => {
      return patient.user_id !== authId
    })
  } 

  return {
    patientsList,
    getAllPatients,
    getPatientById,
    deletePatientByAuthId,
  }
})
