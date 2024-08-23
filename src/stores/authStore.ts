import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import type { Patient, PatientForm } from '@/types/Patient'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import type { BookingActivity } from '@/types/BookingActivity'
import apiFetch from '@/ofetch'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const profile = ref<Patient>()
  const userBooking = ref<BookingActivity | null>(null)

  const setUserBooking = (booking: BookingActivity) => {
    userBooking.value = booking
  }

  const login = async ({ email, password }: { email: string, password: string }) => {
    const toast = useToast()
    const { bookingActivityList } = useBookingActivityStore()

    const { token, patient } = await apiFetch<{ token: string, patient: Patient }>('/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
      onResponseError: (error) => {
        console.error(error)
        toast.error(error.response._data)
      }
    })

    localStorage.setItem('auth_token', token)
    profile.value = patient

    // Cari booking yang statusnya booked dan pasien_id nya sama dengan id user
    const userBooking = bookingActivityList.find(ba => ba.status === 'booked' && ba.pasien_id === profile?.value?.id)
    if (userBooking) {
      setUserBooking(userBooking)
    }

    toast.success('Login berhasil')

    // Redirect ke halaman home
    setTimeout(() => {
      router.replace('/')
    }, 1200);
  }

  const signup = async (profileData: PatientForm) => {
    const toast = useToast()
    // Ambil data dari form register
    const {
      email,
      password,
      name,
      nik,
    } = profileData

    await apiFetch('/auth/register', {
      method: 'POST',
      body: {
        email,
        password,
        name,
        nik,
      },
      onResponseError: (error) => {
        console.error(error)
        toast.error(error.response._data)
      }
    })
    toast.success('Registrasi berhasil, silahkan login')
    setTimeout(() => {
      router.replace('/auth/login')
    }, 1600);
  }

  const logout = async () => {
    localStorage.removeItem('auth_token')
    profile.value = undefined
    userBooking.value = null
    router.replace('/auth/login')
  }

  const getUserData = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    const { patient } = await apiFetch<{ patient: Patient }>('/auth/verify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      onResponseError: (error) => {
        localStorage.removeItem('auth_token')
        console.error(error)
        router.replace('/auth/login')
      }
    })

    const { bookingActivity } = await apiFetch<{ bookingActivity: BookingActivity }>(`/booking-activities/patient/${patient.id}`)

    if (bookingActivity) {
      setUserBooking(bookingActivity)
    }

    profile.value = patient
  }

  const changeEmail = async (email: string) => {
    // await supabase.auth.updateUser({ email })
    await apiFetch(`/patients/${profile.value?.id}/email`, {
      method: 'PATCH',
      body: {
        email,
      },
    })
    profile.value!.email = email
  }

  const changeAddress = async (address: string) => {
    await apiFetch(`/patients/${profile.value?.id}/address`, {
      method: 'PATCH',
      body: {
        address,
      },
    })
    profile.value!.address = address
  }

  const changePhone = async (phone: string) => {
    await apiFetch(`/patients/${profile.value?.id}/phone`, {
      method: 'PATCH',
      body: {
        phone,
      },
    })
    profile.value!.phone = phone
  }

  const changePassword = async (password: string) => {
    await apiFetch(`/patients/${profile.value?.id}/password`, {
      method: 'PATCH',
      body: {
        password,
      },
    })
    profile.value!.password = password
  }

  const changeBirthDate = async (birthdate: string) => {

    await apiFetch(`/patients/${profile.value?.id}/birthdate`, {
      method: 'PATCH',
      body: {
        birthdate,
      },
    })
    profile.value!.birthdate = birthdate
  }

  const isProfileComplete = computed(() => {
    if (
      profile.value?.address
      && profile.value?.email
      && profile.value?.phone
      && profile.value?.nik
      && profile.value?.name
      && profile.value?.password
      && profile.value.address
      && profile.value.birthdate
    ) {
      return true
    }
    return false
  })

  return {
    profile,
    userBooking,
    login,
    signup,
    logout,
    getUserData,
    setUserBooking,
    changeAddress,
    changeEmail,
    changePhone,
    changePassword,
    changeBirthDate,
    isProfileComplete
  }
})
