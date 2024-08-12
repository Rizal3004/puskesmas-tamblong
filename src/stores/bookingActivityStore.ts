import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/supabase'
import type { BookingActivity, BookingActivityForm } from '@/types/BookingActivity'
import getCurrentTime from '@/utils/getCurrentTime'
import { useToast } from 'vue-toast-notification'

export const useBookingActivityStore = defineStore('BookingActivity', () => {
  // Store untuk data aktivitas booking
  const bookingActivityList = ref<BookingActivity[]>([])
  
  const addBookingActivity = async (data: BookingActivityForm) => {
    const toast = useToast()
    const { setUserBooking } = useAuthStore()
    const { data: bh } = await supabase.from('booking_hours').insert({
      starts_at: data.starts_at,
      ends_at: data.ends_at,
    }).select('id').limit(1).single()

    if (!bh) return
    const { data: b } = await supabase.from('booking_activity').upsert({
      // @ts-expect-error: bpjs_number is there
      bpjs_number: data.bpjs_number,
      penyakit: null,
      resep: null,
      status: 'booked',
      created_at: new Date().toISOString(),
      booking_hours_id: bh.id,
      pasien_id: data.pasien_id,
      dokter_id: data.dokter_id,
      date: data.date,
      patient_type: data.patient_type,
      keluhan: data.keluhan,
    }).select('*').limit(1).single()

    const newBookingActivity = <BookingActivity>{
      booking_hours_id: bh!.id,
      bpjs_number: data.bpjs_number,
      created_at: new Date().toISOString(),
      date: data.date!,
      dokter_id: data.dokter_id,
      id: b!.id,
      keluhan: data.keluhan,
      pasien_id: data.pasien_id,
      patient_type: data.patient_type,
      penyakit: null,
      resep: null,
      status: 'booked',
    }

    bookingActivityList.value.push(newBookingActivity)
    setUserBooking(newBookingActivity)
    // toast.success('Anda telah melakukan booking dokter, silahkan melihat detail booking anda dengan menekan tombol "jadwal pengobatan"')
  }

  const getBookingActivitybyId = (id: number) => {
    const ba = bookingActivityList.value.find(ba => ba.id === id)
    return ba
  }

  const getBookingActivityByDoctorIdAndDate = (doctorId: number, date: string) => {
    const ba = bookingActivityList.value.filter(ba => ba.dokter_id === doctorId && ba.date === date)
    if (ba.length > 0) {
      return ba
    } else {
      return null
    }
  }

  const getBookingActivity = async () => {
    const { setUserBooking } = useAuthStore()
    const { profile } = useAuthStore()

    // Ambil data aktivitas booking dari table booking_activity
    const { data } = await supabase.from('booking_activity').select('*')
    if (!data) return
    bookingActivityList.value = data as BookingActivity[]

    // Cari booking yang statusnya booked dan pasien_id nya sama dengan id user
    const userBooking = bookingActivityList.value.find(ba => ba.status === 'booked' && ba.pasien_id === profile?.id)
    if (userBooking) {
      setUserBooking(userBooking)
    }
  }

  const handleDoneBooking = async (bookingId: number, { penyakit, resep }: { penyakit: string, resep: string }) => {
    await supabase.from('booking_activity').update({
      status: 'done',
      penyakit,
      resep,
    }).eq('id', bookingId)
    bookingActivityList.value = bookingActivityList.value.map((ba) => {
      if (ba.id === bookingId) {
        return {
          ...ba,
          status: 'done',
          penyakit,
          resep,
        }
      }
      return ba
    })
  }

  const handleCancelBooking = async (bookingId: number) => {
    await supabase.from('booking_activity').update({
      status: 'canceled',
    }).eq('id', bookingId)
    bookingActivityList.value = bookingActivityList.value.map((ba) => {
      if (ba.id === bookingId) {
        return {
          ...ba,
          status: 'canceled',
        }
      }
      return ba
    })
  }

  const handleChangeBookingDate = async (bookingId: number, date: string) => {
    await supabase.from('booking_activity').update({
      date,
    }).eq('id', bookingId)

    bookingActivityList.value = bookingActivityList.value.map((ba) => {
      if (ba.id === bookingId) {
        return {
          ...ba,
          date,
        }
      }
      return ba
    })
  }

  const handlePatientArrived = async (bookingId: number) => {
    console.log('bookingId', bookingId)
    await supabase.from('booking_activity').update({
      arrived_at: getCurrentTime(),
    }).eq('id', bookingId)

    bookingActivityList.value = bookingActivityList.value.map((ba) => {
      if (ba.id === bookingId) {
        return {
          ...ba,
          arrived_at: getCurrentTime(),
        }
      }
      return ba
    })
  }

  return {
    bookingActivityList,
    getBookingActivity,
    addBookingActivity,
    handleDoneBooking,
    handleCancelBooking,
    getBookingActivitybyId,
    handleChangeBookingDate,
    getBookingActivityByDoctorIdAndDate,
    handlePatientArrived,
  }
})
