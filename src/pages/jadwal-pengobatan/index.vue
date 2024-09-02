<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import SolarArrowLeftLinear from '~icons/solar/arrow-left-linear'
import formatDate from '@/utils/formatDate'
import { useDoctorStore } from '@/stores/doctorStore'
import Header from '@/components/Header.vue'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'

const router = useRouter()
const { userBooking } = storeToRefs(useAuthStore())
const { handlePatientArrived, handleCancelBooking, getQueueNumber } = useBookingActivityStore()
const { getDoctorById } = useDoctorStore()

const doctor = computed(() => {
  const doctor2 = getDoctorById(userBooking.value!.dokter_id!)
  return doctor2
})

// const bookingHours = computed(() => {
//   const bookingHour2 = getBookingHourById(userBooking.value!.booking_hours_id!)
//   return bookingHour2
// })

async function handleArrived(bookingId: number) {
  // eslint-disable-next-line no-alert
  const confirmArrived = confirm('Apakah anda sudah sampai di puskesmas?')
  if (!confirmArrived) return
  await handlePatientArrived(bookingId)
  router.go(0)
}

async function handleCancel(bookingId: number) {
  // eslint-disable-next-line no-alert
  const confirmCancel =  confirm('Apakah anda yakin ingin membatalkan booking?')
  if (!confirmCancel) return
  await handleCancelBooking(bookingId)
  router.push('/')
}

onMounted(() => {
  if (!userBooking.value) {
    router.push('/')
  }
})
</script>

<template>
  <Header />
  <div class="space-y-3 px-6 py-4 md:px-36">
    <div class="md:w-8/12">
      <RouterLink to="/" class="flex w-fit items-center gap-3 rounded-md px-3.5 py-1 text-slate-700 transition-all duration-500 hover:bg-slate-100">
        <SolarArrowLeftLinear class="" />
        <span class="">Kembali</span>
      </RouterLink>
      <h1 class="text-2xl font-semibold">Jadwal Pengobatan</h1>
      <p>Pasien diharapkan datang 15 menit sebelum waktu yang ditentukan</p>
      <div v-if="userBooking" class="">
        <table class="[&>*>*]:border [&>*>*]:px-2 [&>*>*]:text-start">
          <tr>
            <th>Nomor Antrian</th>
            <td>{{ getQueueNumber(userBooking?.id) }}</td>
          </tr>
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
            <td>{{ userBooking.starts_at }}</td>
          </tr>
          <tr>
            <th>Jam berakhir</th>
            <td>{{ userBooking.ends_at }}</td>
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
        <p v-if="!userBooking.arrived_at" class="mt-2 text-end text-sm">Klik Tombol 'Sampai ke Puskesmas' jika anda telah berada di puskesmas</p>
        <div class="mt-4 flex justify-end gap-4">
          <button type="button" class="rounded-md border border-red-500 px-4" @click="() => handleCancel(userBooking!.id)">
            Batalkan booking
          </button>
          <RouterLink to="/jadwal-pengobatan/tiket" type="button" class="rounded-md border border-amber-500 px-4">
            Lihat Tiket
          </RouterLink>
          <button v-if="!userBooking.arrived_at" class="rounded-md bg-green-300 px-2 py-1 text-sm" @click="() => handleArrived(userBooking!.id)">
            Sampai ke Puskesmas
          </button>
          <p v-else class="rounded-md px-2 py-1 text-sm">
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
