<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import SolarArrowLeftLinear from '~icons/solar/arrow-left-linear'
import formatDate from '@/utils/formatDate'
import { useBookingHoursStore } from '@/stores/bookingHoursStore'
import { useDoctorStore } from '@/stores/doctorStore'
import Header from '@/components/Header.vue'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'

const router = useRouter()
const { userBooking } = storeToRefs(useAuthStore())
const { handlePatientArrived } = useBookingActivityStore()
const { getBookingHourById } = useBookingHoursStore()
const { getDoctorById } = useDoctorStore()

const doctor = computed(() => {
  const doctor2 = getDoctorById(userBooking.value!.dokter_id!)
  return doctor2
})

const bookingHours = computed(() => {
  const bookingHour2 = getBookingHourById(userBooking.value!.booking_hours_id!)
  return bookingHour2
})

async function handleArrived(bookingId: number) {
  await handlePatientArrived(bookingId)
}

onMounted(() => {
  if (!userBooking.value) {
    router.push('/')
  }
})
</script>

<template>
  <Header />
  <div class="px-36 py-4 space-y-3">
    <div class="w-8/12">
      <RouterLink to="/" class="flex items-center gap-3 text-slate-700 px-3.5 py-1 rounded-md transition-all duration-500 hover:bg-slate-100 w-fit">
        <SolarArrowLeftLinear class="" />
        <span class="">Kembali</span>
      </RouterLink>
      <h1 class="text-2xl font-semibold">Jadwal Pengobatan</h1>
      <p>Pasien diharapkan datang 15 menit sebelum waktu yang ditentukan</p>
      <div v-if="userBooking && bookingHours" class="">
        <table class="[&>*>*]:border [&>*>*]:text-start [&>*>*]:px-2">
          <tr>
            <th>Tanggal</th>
            <td>{{ formatDate(userBooking?.date) }}</td>
          </tr>
          <tr>
            <th>Dokter</th>
            <td>{{ doctor!.name }}</td>
          </tr>
          <tr>
            <th>Jam mulai</th>
            <td>{{ bookingHours.starts_at }}</td>
          </tr>
          <tr>
            <th>Jam berakhir</th>
            <td>{{ bookingHours.ends_at }}</td>
          </tr>
          <tr>
            <th>Jenis pasien</th>
            <td class="capitalize">{{ userBooking.patient_type }}</td>
          </tr>
          <tr>
            <th>No BPJS</th>
            <td class="capitalize">{{ userBooking.bpjs_number }}</td>
          </tr>
          <tr>
            <th>Keluhan</th>
            <td class="capitalize">{{ userBooking.keluhan }}</td>
          </tr>
        </table>
        <p class="text-end text-sm mt-2" v-if="!userBooking.arrived_at">Klik Tombol 'Sampai ke Puskesmas' jika anda telah berada di puskesmas</p>
        <div class="flex justify-end mt-4">
          <button v-if="!userBooking.arrived_at" class="bg-green-300 text-sm px-2 py-1 rounded-md" @click="() => handleArrived(userBooking!.id)">
            Sampai ke Puskesmas
          </button>
          <p v-else class="text-sm px-2 py-1 rounded-md">
            Silahkan menunggu
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
th {
  width: 1%;
  white-space: nowrap;
}
</style>
