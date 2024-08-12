import type { BookingHour } from '@/types/BookingHour'

export interface BookingActivity {
  date: string
  dokter_id: number
  pasien_id: number
  patient_type: 'umum' | 'bpjs'
  keluhan: string | null
  bpjs_number: string | null

  penyakit: string | null
  arrived_at: string | null
  resep: string | null
  booking_hours_id: number
  created_at: string | null
  id: number
  status: 'booked' | 'canceled' | 'done'
}

export type BookingActivityForm =
  Omit<Partial<BookingActivity>, 'id' | 'created_at' | 'status' | 'booking_hours_id' | 'resep' | 'penyakit'>
  & Omit<BookingHour, 'id'>
