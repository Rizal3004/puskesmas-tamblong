import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import type { Patient } from '@/types/Patient'
import apiFetch from '@/ofetch'

export const usePatientsStore = defineStore('Patients', () => {
  const patientsList = ref<Patient[]>([])

  const getAllPatients = async () => {
    const patients = await apiFetch<Patient[]>('/patients')
    patientsList.value = patients
  }

  const getPatientById = (id: string) => {
    const patient = patientsList.value.find(patient => patient.id.toString() === id)
    return patient
  }

  const deletePatientByAuthId = async (authId: string) => {
    const toast = useToast()
    await apiFetch(`/patients/${authId}`, {
      method: 'DELETE',
      onResponseError: (error) => {
        console.error(error)
        toast.error(error.response._data)
      },
    })

    patientsList.value = patientsList.value.filter((patient) => {
      return patient.id.toString() !== authId
    })
  }

  const updatePatientEmailAndPassword = async ({ patientId, email, password }: { patientId: number, email: string, password: string }) => {
    await apiFetch(`/patients/${patientId}/email`, {
      method: 'PATCH',
      body: { email },
    })
    await apiFetch(`/patients/${patientId}/password`, {
      method: 'PATCH',
      body: { password },
    })

    patientsList.value = patientsList.value.map((patient) => {
      if (patient.id === patientId) {
        return { ...patient, email, password }
      }
      return patient
    })
  }

  return {
    patientsList,
    getAllPatients,
    getPatientById,
    deletePatientByAuthId,
    updatePatientEmailAndPassword,
  }
})
