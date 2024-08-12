import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { supabase } from '@/supabase'
import type { Doctor2, DoctorForm } from '@/types/Doctor'

export const useDoctorStore = defineStore('Doctor', () => {
  const router = useRouter()
  const toast = useToast()

  // Store untuk data dokter
  const doctorList = ref<Doctor2[]>([])

  // Fungsi untuk mengambil data dokter dari table doctor
  const getAllDoctors = async () => {
    const { data } = await supabase.from('doctor').select('*')
    doctorList.value = data!.map((doctor) => {
      return {
        ...doctor,
        imgUrl: (supabase.storage.from('avatars').getPublicUrl(`doctor/${doctor.id}.png`)).data.publicUrl,
      } as Doctor2
    })
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
    const { data, error } = await supabase.from('doctor').insert({
      email,
      poli_id,
      jam_kerja_end,
      jam_kerja_start,
      name,
      phone,
    }).select('id').single()

    if (error) {
      console.error(error)
      toast.error('Gagal menambahkan dokter')
      return
    }

    const doctorId = data?.id

    const ImageExt = imageFile?.name.split('.').pop()

    await supabase.storage.from('avatars').upload(`doctor/${doctorId}.${ImageExt}`, imageFile!)

    const imgUrl = supabase.storage.from('avatars').getPublicUrl(`doctor/${doctorId}.${ImageExt}`).data.publicUrl
    doctorList.value.push({
      id: doctorId!,
      email,
      jam_kerja_end,
      jam_kerja_start,
      name,
      phone,
      poli_id,
      imgUrl,
    })

    toast.success('Berhasil menambahkan dokter')
  }

  const getDoctorById = (id: number) => {
    return doctorList.value.find(doctor => doctor.id === id)
  }

  return {
    doctorList,
    getAllDoctors,
    createDoctor,
    getDoctorById,
  }
})
