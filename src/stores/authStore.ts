import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { supabase } from '@/supabase'
import type { Patient, PatientForm } from '@/types/Patient'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import type { BookingActivity } from '@/types/BookingActivity'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toast = useToast()

  const profile = ref<Patient>()
  const userBooking = ref<BookingActivity | null>(null)

  const setUserBooking = (booking: BookingActivity) => {
    userBooking.value = booking
  }

  const login = async ({ email, password }: { email: string, password: string }) => {
    const { bookingActivityList } = useBookingActivityStore()
    // Ambil data dari form login
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // Jika error, log error dan return
    if (error) {
      console.error(error)
      if (error.status === 429) {
        toast.error('Terlalu banyak request, coba lagi nanti')
      } else {
        toast.error(error.message)
      }
      return
    }

    const token = session?.access_token

    // Masukkan token ke local storage
    localStorage.setItem('auth_token', token!)

    // user id
    const userId = user!.id

    // Ambil data user dari table patients
    const { data } = await supabase.from('patients').select('*').eq('user_id', userId).single()

    // Masukkan data user ke store
    profile.value = data as Patient

    // Cari booking yang statusnya booked dan pasien_id nya sama dengan id user
    const userBooking = bookingActivityList.find(ba => ba.status === 'booked' && ba.pasien_id === profile?.value?.id)
    if (userBooking) {
      setUserBooking(userBooking)
    }

    // Redirect ke halaman home
    router.replace('/')
  }

  const signup = async (profileData: PatientForm) => {
    // Ambil data dari form register
    const {
      email,
      password,
      name,
      nik,
    } = profileData

    // Buat user baru di auth supabase
    const { data: { user, session }, error } = await supabase.auth.signUp({
      email: email!,
      password,
    })

    // Jika error, log error dan return
    if (error) {
      console.error(error)
      if (error.status === 429) {
        toast.error('Terlalu banyak request, coba lagi nanti')
      } else {
        toast.error(error.message)
      }
      return
    }

    // Masukkan data user ke table patients
    const { data: profile2, error: error2 } = await supabase.from('patients').insert({
      password,
      name,
      nik,
      user_id: user!.id,
    }).select('*').limit(1).maybeSingle()

    // Jika error, log error dan return
    if (error2) {
      console.error(error2)
      return
    }

    // Masukkan data user ke store
    profile.value = {
      id: profile2!.id,
      name,
      nik,
      password,
      user_id: user!.id,
      address: null,
      birthdate: null,
      phone: null,
    }

    const token = session?.access_token

    // Masukkan token ke local storage
    localStorage.setItem('auth_token', token!)

    // Redirect ke halaman home
    router.replace('/')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('auth_token')
    profile.value = undefined
    userBooking.value = null
    router.replace('/auth/login')
  }

  const sendOtp = async (email: string) => {
    await supabase.auth.signInWithOtp({ email })
  }

  const verifyOtp = async (email: string, otp: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (error) {
      toast.error(error.message)
    }

    const userId = data.user!.id
    const authToken = data.session!.access_token

    const { data: profileData } = await supabase.from('patients').select('*').eq('user_id', userId).limit(1).single()

    localStorage.setItem('auth_token', authToken)
    profile.value = profileData as Patient

    router.replace('/profile')
  }

  const getUserData = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return

    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      return localStorage.removeItem('auth_token')
    }
    const userId = user?.id
    if (!userId) return
    const { data } = await supabase.from('patients').select('*').eq('user_id', userId).single()
    profile.value = data as Patient
  }

  const changeEmail = async (email: string) => {
    await supabase.auth.updateUser({ email })
  }

  const changeAddress = async (address: string) => {
    await supabase.from('patients').update({ address }).eq('id', profile.value!.id!)
    profile.value!.address = address
  }

  const changePhone = async (phone: string) => {
    await supabase.from('patients').update({ phone }).eq('id', profile.value!.id!)
    profile.value!.phone = phone
  }

  const changePassword = async (password: string) => {
    await supabase.auth.updateUser({ password })
    // await supabase.auth.admin.updateUserById(profile.value!.user_id!, { password })
    await supabase.from('patients').update({ password }).eq('id', profile.value!.id!)
    profile.value!.password = password
  }

  return {
    profile,
    userBooking,
    login,
    signup,
    logout,
    sendOtp,
    verifyOtp,
    getUserData,
    setUserBooking,
    changeAddress,
    changeEmail,
    changePhone,
    changePassword,
  }
})
