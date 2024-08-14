import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import type { Doctor, DoctorForm } from '@/types/Doctor'
import jpegToPng from '@/utils/jpegToPng'
import apiFetch from '@/ofetch'

export const useDoctorStore = defineStore('Doctor', () => {
  const toast = useToast()

  // Store untuk data dokter
  const doctorList = ref<Doctor[]>([])

  // Fungsi untuk mengambil data dokter dari table doctor
  const getAllDoctors = async () => {
    const doctors = await apiFetch<Doctor[]>('/doctors')

    doctorList.value = doctors
  }

  const createDoctor = async (doctor: DoctorForm) => {
    const {
      email,
      imageFile,
      jam_kerja_end,
      jam_kerja_start,
      name,
      phone,
      poli_id,
    } = doctor

    const formData = new FormData()
    formData.append('email', email!)
    formData.append('jam_kerja_end', jam_kerja_end!)
    formData.append('jam_kerja_start', jam_kerja_start!)
    formData.append('name', name!)
    formData.append('phone', phone!)
    formData.append('poli_id', String(poli_id))


    const imageFile2 = await jpegToPng(imageFile as File)

    formData.append('imageFile', imageFile2)

    const { doctor: doctor2 } = await apiFetch<{ doctor: Doctor }>('/doctors', {
      method: 'POST',
      body: formData,
      onResponseError: (error) => {
        return console.error(error)
      },
    })

    doctorList.value.push(doctor2)

    toast.success('Berhasil menambahkan dokter')
  }

  const getDoctorById = (id: number) => {
    return doctorList.value.find(doctor => doctor.id === id)
  }

  const deleteDoctor = async (id: number) => {
    await apiFetch(`/doctors/${id}/deactivate`, {
      method: 'POST',
      onResponseError: (error) => {
        console.error(error)
        toast.error(error.response._data)
      },
    })

    const doctorIndex = doctorList.value.findIndex(doctor => doctor.id === id)
    doctorList.value.splice(doctorIndex, 1)
    toast.success('Berhasil menghapus dokter')
  }

  return {
    doctorList,
    getAllDoctors,
    createDoctor,
    getDoctorById,
    deleteDoctor,
  }
})
