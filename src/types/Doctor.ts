export interface Doctor {
  id: number
  email: string | null
  jam_kerja_end: string | null
  jam_kerja_start: string | null
  name: string | null
  phone: string | null
  poli_id: number
}

export type Doctor2 = Doctor & { imgUrl: string }

export type DoctorForm = Omit<Doctor, 'id'> & { imageFile?: File }
