export interface Patient {
  address: string | null
  birthdate: string | null
  id: number
  name: string | null
  nik: string | null
  password: string
  phone: string | null
  user_id: string
}

export type PatientForm = Omit<Patient, 'id' | 'user_id' | 'address' | 'birthdate' | 'phone'> & { email: string }
export type PatientUpdateForm = Omit<Patient, 'id' | 'user_id' | 'email'>
