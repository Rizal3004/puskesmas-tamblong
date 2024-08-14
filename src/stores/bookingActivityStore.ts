import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/stores/authStore'
// import { supabase } from '@/supabase'
import type { BookingActivity, BookingActivityForm } from '@/types/BookingActivity'
import getCurrentTime from '@/utils/getCurrentTime'
import apiFetch from '@/ofetch'

export const useBookingActivityStore = defineStore('BookingActivity', () => {
  // Store untuk data aktivitas booking
  const bookingActivityList = ref<BookingActivity[]>([])

  
  const getBookingActivity = async () => {
    const { setUserBooking } = useAuthStore()
    const { profile } = useAuthStore()

    // Ambil data aktivitas booking dari table booking_activity
    // const { data } = await supabase.from('booking_activity').select('*')
    const { bookingActivities } = await apiFetch<{bookingActivities: BookingActivity[]}>('/booking-activities')
    if (!bookingActivities) return
    bookingActivityList.value = bookingActivities

    // Cari booking yang statusnya booked dan pasien_id nya sama dengan id user
    const userBooking = bookingActivityList.value.find(ba => ba.status === 'booked' && ba.pasien_id === profile?.id)
    if (userBooking) {
      setUserBooking(userBooking)
    }
  }

  const addBookingActivity = async (data: BookingActivityForm) => {
    const toast = useToast()
    const { setUserBooking } = useAuthStore()

    const newBookingActivityData = {
      starts_at: data.starts_at,
      ends_at: data.ends_at,
      bpjs_number: data.bpjs_number,
      pasien_id: data.pasien_id,
      dokter_id: data.dokter_id,
      date: data.date,
      patient_type: data.patient_type,
      keluhan: data.keluhan,
    }

    const { booking_activity } = await apiFetch<{ booking_activity: BookingActivity }>('/booking-activities', {
      method: 'POST',
      body: newBookingActivityData,
      onResponseError: (error) => {
        console.error(error)
      }
    })

    bookingActivityList.value.push(booking_activity)
    setUserBooking(booking_activity)
    toast.success('Anda telah melakukan booking dokter, silahkan melihat detail booking anda dengan menekan tombol "jadwal pengobatan"')
  }

  const getBookingActivitybyId = (id: string) => {
    const ba = bookingActivityList.value.find(ba => ba.id.toString() === id)
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

  const handleDoneBooking = async (bookingId: number, { penyakit, resep }: { penyakit: string, resep: string }) => {
    await apiFetch(`/booking-activities/${bookingId}/done`, {
      method: 'PATCH',
      body: {
        penyakit,
        resep,
      },
    })
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
    await apiFetch(`/booking-activities/${bookingId}/cancel`, {
      method: 'PATCH',
    })
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

  const handleChangeBookingDate = async (bookingId: number, data: {date: string, starts_at: string, ends_at: string, dokter_id: string}) => {
    await apiFetch(`/booking-activities/${bookingId}/update-time-and-doctor`, {
      method: 'PATCH',
      body: data,
    })

    bookingActivityList.value = bookingActivityList.value.map((ba) => {
      if (ba.id === bookingId) {
        return {
          ...ba,
          date: data.date,
          dokter_id: Number(data.dokter_id),
          starts_at: data.starts_at,
          ends_at: data.ends_at,
        }
      }
      return ba
    })
  }

  const handlePatientArrived = async (bookingId: number) => {
    // await supabase.from('booking_activity').update({
    //   arrived_at: getCurrentTime(),
    // }).eq('id', bookingId)

    await apiFetch(`/booking-activities/${bookingId}/arrived`, {
      method: 'PATCH',
    })

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
