import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { useDoctorStore } from './doctorStore'
import { useAuthStore } from '@/stores/authStore'
// import { supabase } from '@/supabase'
import type { BookingActivity, BookingActivityForm } from '@/types/BookingActivity'
import getCurrentTime from '@/utils/getCurrentTime'
import apiFetch from '@/ofetch'
// import { botSendMessage } from '@/bot'
import isTime1GreaterThanTime2 from '@/utils/isTime1GreaterThanTime2'
import createTimeFromString2 from '@/utils/createTimeFromString2'

export const useBookingActivityStore = defineStore('BookingActivity', () => {
  // Store untuk data aktivitas booking
  const bookingActivityList = ref<BookingActivity[]>([])
  const allBookingActivityList = ref<BookingActivity[]>([])

  const getBookingActivity = async () => {
    // const { setUserBooking } = useAuthStore()
    // const { profile } = useAuthStore()

    // Ambil data aktivitas booking dari table booking_activity
    // const { data } = await supabase.from('booking_activity').select('*')
    const { bookingActivities } = await apiFetch<{ bookingActivities: BookingActivity[] }>('/booking-activities')
    if (!bookingActivities) return
    bookingActivityList.value = bookingActivities

    // Cari booking yang statusnya booked dan pasien_id nya sama dengan id user
    // const userBooking = bookingActivityList.value.find(ba => ba.status === 'booked' && ba.pasien_id === profile?.id)
    // if (userBooking) {
    //   setUserBooking(userBooking)
    // }
  }

  // const getAllBookingActivity = async () => {
  //   const { profile } = useAuthStore()

  //   // Ambil data aktivitas booking dari table booking_activity
  //   // const { data } = await supabase.from('booking_activity').select('*')
  //   const { bookingActivities } = await apiFetch<{ bookingActivities: BookingActivity[] }>('/booking-activities')
  //   if (!bookingActivities) return
  //   bookingActivityList.value = bookingActivities

  //   // Cari booking yang statusnya booked
  //   const allBookingActivityList2 = bookingActivityList.value.find(ba => ba.status === 'booked')
  //   if (allBookingActivityList2) {
  //     allBookingActivityList.value = allBookingActivityList2
  //   }

  // }

  const refetchBookingActivity = async () => {
    getBookingActivity()
    console.log('refetch booking activity')
  }

  const addBookingActivity = async (data: BookingActivityForm) => {
    // inisialize composables
    const toast = useToast()
    // const { setUserBooking } = useAuthStore()
    const { getDoctorById } = useDoctorStore()

    // the new booking activity data
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

    // send the new booking activity data to the server
    const { booking_activity } = await apiFetch<{ booking_activity: BookingActivity }>('/booking-activities', {
      method: 'POST',
      body: newBookingActivityData,
      onResponseError: (error) => {
        toast.error('Dokter tidak tersedia pada jam tersebut')
        return console.error(error)
      },
    })

    bookingActivityList.value.push(booking_activity)
    // setUserBooking(booking_activity)
    //     botSendMessage(`
    // Booking baru untuk dokter <b>${getDoctorById(booking_activity.dokter_id)?.name}</b> telah dibuat.
    // Tanggal: ${booking_activity.date}
    // Jam: ${booking_activity.starts_at} - ${booking_activity.ends_at}

    // Keluhan: ${booking_activity.keluhan}
    //       `)
    toast.success('Anda telah melakukan booking dokter, silahkan melihat detail booking anda dengan menekan tombol "jadwal pengobatan" pada halaman profile')
  }

  const getBookingActivitybyId = (id: string) => {
    const ba = bookingActivityList.value.find(ba => ba.id.toString() === id)
    return ba
  }

  const getBookingActivityByDoctorId = (doctorId: number) => {
    const baList = bookingActivityList.value.filter(ba => ba.dokter_id === doctorId)
    if (baList.length > 0) {
      return baList
    } else {
      return null
    }
  }

  const getBookingActivityByDoctorIdAndDate = (doctorId: number, date: string) => {
    const ba = bookingActivityList.value.filter(ba => ba.dokter_id === doctorId && ba.date === date)
    if (ba.length > 0) {
      return ba
    } else {
      return null
    }
  }

  // const getQueueNumber = (baId: number) => {
  //   const ba2 = bookingActivityList.value.find(ba => ba.id === baId)
  //   if (ba2) {
  //     const baListWithSameDate = bookingActivityList.value.filter(ba => ba.date === ba2.date).sort((a, b) => {
  //       const aDate = createTimeFromString2(a.created_at!)
  //       const bDate = createTimeFromString2(b.created_at!)
  //       return isTime1GreaterThanTime2(aDate, bDate) ? 1 : -1
  //     })

  //     const index = baListWithSameDate.findIndex(ba => ba.id === baId)

  //     // console.log(baListWithSameDate)
  //     // console.log(index)

  //     return index + 1
  //   }
  //   return null
  // }

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

  const handleChangeBookingDate = async (bookingId: number, data: { date: string, starts_at: string, ends_at: string, dokter_id: string }) => {
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
    getBookingActivityByDoctorId,
    // getQueueNumber,
    refetchBookingActivity,
  }
})
