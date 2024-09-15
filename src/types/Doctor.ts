export interface Doctor {
  id: number
  email: string | null
  jam_kerja_end: string | null
  jam_kerja_start: string | null
  name: string | null
  phone: string | null
  poli_id: number
  status: "active" | "nonactive"
}

export type DoctorForm = Omit<Doctor, 'id' | 'status'> & { imageFile?: File }
