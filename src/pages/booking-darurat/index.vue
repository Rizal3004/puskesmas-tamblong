<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toast-notification'
import SelectTime from '@/components/BookingForm/SelectTime.vue'
import type { BookingActivity } from '@/types/BookingActivity'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import apiFetch from '@/ofetch'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import validateInputNumber from '@/utils/validateInputNumber'

const router = useRouter()
const toast = useToast()
const { doctorList } = storeToRefs(useDoctorStore())
const { poliList } = usePoliStore()
const { bookingActivityList } = useBookingActivityStore()

const nik = ref<string>()
const bookingFormData = reactive<{
  name: string
  dokter_id: number
  keluhan: string
  phone: string
  date?: string
  birthDate?: string
  starts_at: string
  ends_at: string
}>({
  name: '',
  dokter_id: 0,
  keluhan: '',
  phone: '',
  birthDate: undefined,
  date: undefined,
  starts_at: '',
  ends_at: '',
})

const selectedPoliId = ref<number>()
const doctorList2 = computed(() => {
  return doctorList.value.filter((d) => {
    return d.poli_id === selectedPoliId.value
  })
})

async function handleBooking() {
  if (nik.value?.length !== 16) {
    toast.error('NIK harus 16 digit')
    return
  }

  const { booking_activity } = await apiFetch<{ booking_activity: BookingActivity }>('/booking-activities/emergency', {
    method: 'POST',
    body: {
      ...bookingFormData,
      nik: nik.value,
    },
  })

  localStorage.setItem('emergency_booking_id', booking_activity.id.toString())

  router.push('/booking-darurat/antrian')
}

function baBooked() {
  return bookingActivityList.filter((ba) => {
    if (ba.status === 'booked') {
      return true
    } else {
      return false
    }
  }).filter((ba) => {
    return ba.date === bookingFormData.date && ba.dokter_id === bookingFormData.dokter_id
  })
    .map((ba) => {
      return {
        starts_at: ba.starts_at,
        ends_at: ba.ends_at,
      }
    })
}
</script>

<template>
  <div id="booking" class="relative block items-center gap-8 px-4 py-16 md:px-36">
    <div class="space-y-4">
      <RouterLink to="/auth/login" class=" bg-slate-400 text-white rounded-md border px-3 py-0.5 text-sm hover:bg-sky-600">
        Login
      </RouterLink>
      <h3 class="text-3xl" data-aos="fade-up">
        Booking Dokter
      </h3>
      <form class="space-y-4" @submit.prevent="handleBooking">
        <div class="grid grid-cols-2 gap-x-3.5 gap-y-3" data-aos="fade-up">
          <label class="flex flex-col gap-1">
            Nama
            <input
              v-model="bookingFormData.name"
              class="rounded-md border px-2 py-1"
              required
              placeholder="Masukkan Nama"
            >
          </label>
          <label class="flex flex-col gap-1">
            NIK
            <input
              v-model="nik"
              class="rounded-md border px-2 py-1"
              required
              placeholder="Masukkan NIK anda"
              @keypress="validateInputNumber"
            >
          </label>
          <label class="flex flex-col gap-1">
            No Telepon
            <input
              v-model="bookingFormData.phone"
              class="rounded-md border px-2 py-1"
              required
              placeholder="Masukkan No Telepon anda"
              @keypress="validateInputNumber"
            >
          </label>

          <label class="flex flex-col gap-1">
            Tanggal Lahir
            <input
              id=""
              v-model="bookingFormData.birthDate"
              required
              type="date"
              name=""
              class="rounded-md border px-2 py-1"
            >
          </label>
          <label class="flex flex-col gap-1">
            Tanggal
            <input
              id=""
              v-model="bookingFormData.date"
              type="date"
              name=""
              required
              :min="new Date().toISOString().split('T')[0]"
              class="rounded-md border px-2 py-1"
            >
          </label>
          <label class="flex flex-col gap-1">
            Poli
            <select v-model="selectedPoliId" class="rounded-md border px-2 py-1" required>
              <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Dokter
            <select v-model="bookingFormData.dokter_id" class="rounded-md border px-2 py-1" required>
              <option v-for="dokter in doctorList2" :key="dokter.id" :value="dokter.id">{{ dokter.name }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Jam Booking
            <SelectTime
              v-model:startsAt="bookingFormData.starts_at!"
              v-model:endsAt="bookingFormData.ends_at!"
              :baBooked="baBooked()"
            />
          </label>
        </div>
        <label class="flex flex-col gap-1" data-aos="fade-up">
          Gejala
          <textarea
            v-model="bookingFormData.keluhan"
            class="block w-full rounded-md border px-2 py-1"
            required
            placeholder="Masukkan Gejala"
          />
        </label>
        <button class="w-fit rounded bg-slate-600 px-12 py-1 text-center text-lg text-white hover:bg-sky-600" data-aos="fade-up">
          Booking
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>
