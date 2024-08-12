import { defineStore } from 'pinia'
import type { BookingHour } from '@/types/BookingHour'
import { supabase } from '@/supabase'

export const useBookingHoursStore = defineStore('BookingHours', () => {
  // Store untuk data jam booking
  const bookingHoursList = ref<BookingHour[]>([])

  // Fungsi untuk mengambil data jam booking dari table booking_hours
  const getBookingHours = async () => {
    const { data } = await supabase.from('booking_hours').select('*')
    bookingHoursList.value = data as BookingHour[]
  }

  const getBookingHourById = (id: number) => {
    return bookingHoursList.value.find(bookingHour => bookingHour.id === id)
  }

  const checkIfBookingHourExist = ({ time }: { bookingActivityId: number, time: Omit<BookingHour, 'id'> }) => {
    return bookingHoursList.value.some((bookingHour) => {
      return bookingHour.starts_at === time.starts_at && bookingHour.ends_at === time.ends_at
    })
  }

  const handleChangeBookingHour = async (id: number, data: Omit<BookingHour, 'id'>) => {
    await supabase.from('booking_hours').update({
      starts_at: data.starts_at,
      ends_at: data.ends_at,
    }).eq('id', id)

    bookingHoursList.value = bookingHoursList.value.map((bookingHour) => {
      if (bookingHour.id === id) {
        return {
          ...bookingHour,
          ...data,
        }
      }
      return bookingHour
    })
  }

  return {
    bookingHoursList,
    getBookingHours,
    getBookingHourById,
    handleChangeBookingHour,
    checkIfBookingHourExist,
  }
})
