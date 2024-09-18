<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toast-notification'
import SelectTime from './BookingForm/SelectTime.vue'
import { useAuthStore } from '@/stores/authStore'
import type { BookingActivityForm } from '@/types/BookingActivity'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import validateInputNumber from '@/utils/validateInputNumber'

const router = useRouter()
const toast = useToast()
const { profile, isProfileComplete } = useAuthStore()
const { doctorList } = storeToRefs(useDoctorStore())
const { bookingActivityList } = useBookingActivityStore()
const { poliList } = usePoliStore()
const { addBookingActivity } = useBookingActivityStore()

const bookingFormData = reactive<BookingActivityForm>({
  date: undefined, // ok
  dokter_id: undefined, // ok
  pasien_id: profile?.id, // oke
  patient_type: 'umum',
  keluhan: '',
  starts_at: '',
  ends_at: '',
  bpjs_number: '',
})

const selectedPoliId = ref<number>()
const doctorList2 = computed(() => {
  if (!selectedPoliId.value) return []
  if (!bookingFormData.date) return []
  return doctorList.value.filter((d) => {
    return d.poli_id === selectedPoliId.value
  })
})

async function handleBooking() {
  if (!isProfileComplete) {
    toast.warning('Lengkapi profil terlebih dahulu')
    return
  }
  await addBookingActivity(bookingFormData)
  router.go(0)
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

function checkIfDateAvailableToBook() {
  const cannodBooked = bookingActivityList.some((ba) => {
    return ba.pasien_id === profile?.id && ba.date === bookingFormData.date && ba.status === 'booked'
  })
  if (cannodBooked) {
    toast.warning('Anda sudah booking pada tanggal tersebut')
    bookingFormData.date = undefined
  }
}
</script>

<template>
  <div id="booking" class="relative grid items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-36 ">
    <div class="hidden md:block">
      <img
        src="/images/booking.jpg"
        alt=""
        class="absolute bottom-0 left-28 h-[95%]"
        data-aos="fade-right"
      >
    </div>
    <div class="space-y-4">
      <h3 class="text-3xl" data-aos="fade-up">
        Booking Dokter
      </h3>
      <form class="space-y-4" @submit.prevent="handleBooking">
        <div class="grid grid-cols-2 gap-x-3.5 gap-y-3" data-aos="fade-up">
          <!-- <DatePicker v-model:datePicked="bookingFormData.date" /> -->
          <label class="flex flex-col gap-1">
            Tanggal
            <input
              v-model="bookingFormData.date"
              type="date"
              class="rounded-md border px-2 py-1"
              required
              :min="new Date().toISOString().split('T')[0]"
              @change="checkIfDateAvailableToBook"
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
              <option
                v-for="dokter in doctorList2"
                :key="dokter.id"
                :value="dokter.id"
              >{{ dokter.name }}</option>
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
          <label class="flex flex-col gap-1">
            Jenis Pasien
            <select
              v-model="bookingFormData.patient_type"
              class="rounded-md border px-2 py-1"
              required
              @change="bookingFormData.bpjs_number = null"
            >
              <option value="umum">Umum</option>
              <option value="bpjs">BPJS</option>
            </select>
          </label>
          <label v-if="bookingFormData.patient_type === 'bpjs'" class="flex flex-col gap-1">
            No BPJS
            <input
              v-model="bookingFormData.bpjs_number"
              type="text"
              required
              class="rounded-md border px-2 py-1"
              @keypress="validateInputNumber"
            >
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
        <button class="w-full rounded bg-slate-600 py-1 text-lg text-white hover:bg-sky-600" data-aos="fade-up">
          Booking
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
