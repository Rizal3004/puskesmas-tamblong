<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { useDoctorStore } from '@/stores/doctorStore'
import ShowKeluhan from '@/components/Booking/ShowKeluhan.vue'
import { useAuthStore } from '@/stores/authStore'

const { bookingActivityList } = storeToRefs(useBookingActivityStore())
const { profile } = useAuthStore()
const { getPatientById } = usePatientsStore()
const { getDoctorById } = useDoctorStore()

const router = useRouter()

const riwayatOrSedangBerjalan = ref<'riwayat' | 'sedang-berjalan'>('sedang-berjalan')

const bookingActivities2 = computed(() => {
  return bookingActivityList.value?.map((ba) => {
    const patient = getPatientById(ba.pasien_id.toString())
    const doctor = getDoctorById(ba.dokter_id)
    return {
      ...ba,
      patient,
      doctor,
    }
  }).filter((ba) => {
    // const activeBooking = ba.status === 'booked'
    if (ba.status === 'canceled') {
      return false
    }
    if (ba.pasien_id === profile?.id) {
      return true
    }
    return false
  }).filter((ba) => {
    console.log(ba)
    if (riwayatOrSedangBerjalan.value === 'riwayat') {
      return ba.status === 'done'
    }
    if (riwayatOrSedangBerjalan.value === 'sedang-berjalan') {
      return ba.status === 'booked'
    }
    return false
  })
    .sort((a, b) => {
      const timeA = a.arrived_at
      const timeB = b.arrived_at

      if (timeA === null && timeB === null) {
        return 0 // Both are null, consider them equal
      }
      if (timeA === null) {
        return 1 // timeA is null, timeB comes first
      }
      if (timeB === null) {
        return -1 // timeB is null, timeA comes first
      }

      return timeA.localeCompare(timeB) // Both are non-null, compare normally
    })
})
</script>

<template>
  <div class="">
    <!-- <Header class="" /> -->
    <div class="space-y-3 border-t p-4 md:px-36">
      <button
        type="button"
        href="/admin/doctors"
        class="flex w-fit items-center gap-2 rounded-xl px-4 py-1 text-sm transition-all duration-300 hover:bg-slate-100 md:-translate-x-10"
        @click="router.go(-1)"
      >
        <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
        Kembali
      </button>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold">Riwayat Booking</h1>
        <div class="flex items-center">
          <label class="rounded-l-md border px-4 py-1" :class="{ 'bg-sky-100': riwayatOrSedangBerjalan === 'riwayat' }">
            Riwayat
            <input
              id=""
              v-model="riwayatOrSedangBerjalan"
              type="radio"
              name="jenis-riwayat-booking"
              value="riwayat"
              class="hidden"
            >
          </label>
          <label class="rounded-r-md border border-l-0 px-4 py-1" :class="{ 'bg-sky-100': riwayatOrSedangBerjalan === 'sedang-berjalan' }">
            Sedang Berjalan
            <input
              id=""
              v-model="riwayatOrSedangBerjalan"
              type="radio"
              name="jenis-riwayat-booking"
              value="sedang-berjalan"
              class="hidden"
            >
          </label>
        </div>
      </div>
      <div class="overflow-x-scroll rounded-md border p-2 pb-3 md:overflow-x-auto">
        <table class="w-full border-separate border-spacing-x-6">
          <thead class="border-b">
            <tr class="h-12">
              <!-- <th class="text-start">ID</th> -->
              <!-- <th class="text-start" /> -->
              <th class="text-start">Nama pasien</th>
              <th class="text-start">Jenis pasien</th>
              <th class="text-start">No WA pasien</th>
              <th class="text-start">Nama dokter</th>
              <th class="text-start">Tanggal</th>
              <th class="text-start">Jam</th>
              <th class="text-start">Status</th>
              <th class="text-start">Keluhan</th>
              <th class="text-start" />
            </tr>
          </thead>
          <tbody class="text-sm">
            <!-- <tr class="h-1">
              <td colSpan="9" />
            </tr> -->
            <tr v-for="ba in bookingActivities2" :key="ba.id" class="h-10">
              <!-- <td class="text-start">{{ ba.id }}</td> -->
              <!-- <td class="text-start">
                <MaterialSymbolsCheckRounded
                  v-if="ba.arrived_at"
                  class="text-green-400"
                />
                <MaterialSymbolsNestClockFarsightAnalogOutlineRounded
                  v-else
                  class="text-amber-400"
                />
              </td> -->
              <td class="text-start">{{ ba.patient?.name }}</td>
              <td class="text-start">{{ ba.patient_type === 'umum' ? 'Umum' : `BPJS (${ba.bpjs_number})` }}</td>
              <td class="text-start">{{ ba.patient?.phone }}</td>
              <td class="text-start">{{ ba.doctor?.name }}</td>
              <td class="text-start">{{ ba.date }}</td>
              <td class="text-start">{{ ba?.starts_at }} - {{ ba?.ends_at }}</td>
              <td class="text-start">{{ ba.status }}</td>
              <td class="text-start">
                <div class="flex items-center gap-2">
                  {{ ba.keluhan }}
                  <ShowKeluhan :keluhan="ba.keluhan!" />
                </div>
              </td>
              <td>
                <RouterLink v-if="riwayatOrSedangBerjalan === 'riwayat'" :to="`/profile/riwayat/${ba.id}`" class="rounded-md bg-sky-200 px-3 py-0.5">Cetak</RouterLink>
                <RouterLink v-else :to="`/profile/riwayat/${ba.id}/tiket`" class="rounded-md bg-sky-200 px-3 py-0.5">Detail</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

tr {
  border-bottom: 1pt solid #e2e8f0;
}
</style>
