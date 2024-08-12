<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import SelectTime from './BookingForm/SelectTime.vue'
import { useAuthStore } from '@/stores/authStore'
import type { BookingActivityForm } from '@/types/BookingActivity'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useBookingHoursStore } from '@/stores/bookingHoursStore'

const router = useRouter()
const { profile } = useAuthStore()
const { doctorList } = storeToRefs(useDoctorStore())
const { getBookingActivityByDoctorIdAndDate } = useBookingActivityStore()
const { getBookingHourById } = useBookingHoursStore()
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
  if (!bookingFormData.starts_at) return []
  if (!bookingFormData.ends_at) return []
  return doctorList.value.map((d) => {
    return {
      ...d,
      isAvailable: checkIfDoctorIsAvailable({
        doctorId: d.id,
        date: bookingFormData.date!,
        startsAt: bookingFormData.starts_at,
        endsAt: bookingFormData.ends_at,
      }),
    }
  }).filter((d) => {
    return d.poli_id === selectedPoliId.value
  })
})

function checkIfDoctorIsAvailable({ doctorId, date, startsAt, endsAt }: { doctorId: number, date: string, startsAt: string, endsAt: string }) {
  const ba = getBookingActivityByDoctorIdAndDate(doctorId, date)
  if (!ba) return true

  const isAvailable = ba.some((b) => {
    const bookingHour = getBookingHourById(b.booking_hours_id)
    if (!bookingHour) return false

    const startsAtTime = new Date(`${date}T${startsAt}`).getTime()
    const endsAtTime = new Date(`${date}T${endsAt}`).getTime()
    const bookingStartsAtTime = new Date(`${date}T${bookingHour.starts_at}`).getTime()
    const bookingEndsAtTime = new Date(`${date}T${bookingHour.ends_at}`).getTime()

    // TODO: check if the booking is overlapping
    if (startsAtTime >= bookingStartsAtTime && startsAtTime <= bookingEndsAtTime) return false
    // disini
    if (endsAtTime >= bookingStartsAtTime && endsAtTime <= bookingEndsAtTime) return false
    return true
  })

  return isAvailable
}

async function handleBooking() {
  await addBookingActivity(bookingFormData)
  router.go(0)
}
</script>

<template>
  <div id="booking" class="relative grid items-center px-36 grid-cols-2 gap-8 py-16 ">
    <div>
      <img
        src="/images/booking.jpg"
        alt=""
        class="absolute left-28 bottom-0 h-[95%]"
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
              class="border px-2 py-1 rounded-md"
              required
            >
          </label>
          <label class="flex flex-col gap-1">
            Poli
            <select v-model="selectedPoliId" class="border px-2 py-1 rounded-md" required>
              <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Jam Booking
            <SelectTime
              v-model:startsAt="bookingFormData.starts_at"
              v-model:endsAt="bookingFormData.ends_at"
            />
          </label>
          <label class="flex flex-col gap-1">
            Dokter
            <select v-model="bookingFormData.dokter_id" class="border px-2 py-1 rounded-md" required>
              <option
                v-for="dokter in doctorList2"
                :key="dokter.id"
                :value="dokter.id"
                :disabled="!dokter.isAvailable"
              >{{ dokter.name }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Jenis Pasien
            <select
              v-model="bookingFormData.patient_type"
              class="border px-2 py-1 rounded-md"
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
              class="border px-2 py-1 rounded-md"
            >
          </label>
        </div>
        <label class="flex flex-col gap-1" data-aos="fade-up">
          Gejala
          <textarea
            v-model="bookingFormData.keluhan"
            class="block w-full border py-1 px-2 rounded-md"
            required
            placeholder="Masukkan Gejala"
          />
        </label>
        <button class="w-full text-lg text-white rounded py-1 bg-slate-600" data-aos="fade-up">
          Booking
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
