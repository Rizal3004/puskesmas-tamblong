import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { supabase } from '@/supabase'
import type { Doctor2, DoctorForm } from '@/types/Doctor'
import jpegToPng from '@/utils/jpegToPng'

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

    const imageFile2 = await jpegToPng(imageFile as File)

    const doctorId = data?.id

    const ImageExt = imageFile2?.name.split('.').pop()

    await supabase.storage.from('avatars').upload(`doctor/${doctorId}.${ImageExt}`, imageFile2!)

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

  const deleteDoctor = async (id: number) => {
    const { error } = await supabase.from('doctor').delete().eq('id', id)

    if (error) {
      console.error(error.message)
      if (error.code === '23503') {
        toast.error('Gagal menghapus dokter karena masih terdapat pasien yang terhubung dengan dokter ini')
        return
      }
      console.error(error.hint)
      toast.error('Gagal menghapus dokter')
      return
    }

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
