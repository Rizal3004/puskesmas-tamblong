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
  created_at: string | null
  id: number
  starts_at: string
  ends_at: string
  status: 'booked' | 'canceled' | 'done'
}

export type BookingActivityForm =
  Omit<Partial<BookingActivity>, 'id' | 'created_at' | 'status' | 'resep' | 'penyakit'>
