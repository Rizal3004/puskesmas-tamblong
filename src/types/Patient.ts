export interface Patient {
  address: string | null
  birthdate: string | null
  id: number
  name: string | null
  nik: string | null
  password: string
  email: string
  phone: string | null
}

export type PatientForm = Omit<Patient, 'id'> & { email: string }
export type PatientUpdateForm = Omit<Patient, 'id' | 'email'>
