<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { useBookingHoursStore } from '@/stores/bookingHoursStore'
import { usePoliStore } from '@/stores/poliStore'

const { bookingActivityList } = storeToRefs(useBookingActivityStore())
const { getPatientById } = usePatientsStore()
const { getDoctorById } = useDoctorStore()
const { getBookingHourById } = useBookingHoursStore()
const { getPoliById } = usePoliStore()

const searchText = ref('')

const bookingActivities2 = computed(() => {
  return bookingActivityList.value.filter((ba) => {
    return ba.status === 'done'
  }).map((ba) => {
    const patient = getPatientById(ba.pasien_id)
    const doctor = getDoctorById(ba.dokter_id)
    const bookingHour = getBookingHourById(ba.booking_hours_id)
    const poli = getPoliById(doctor!.poli_id!)
    return {
      ...ba,
      patient,
      doctor,
      bookingHour,
      poli,
    }
  })
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Riwayat Booking</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label for="search">Cari Pasien:</label>
          <input
            v-model="searchText"
            class="rounded-md px-2 py-0.5 border mx-2"
            type="text"
          >
        </div>
      </div>
    </div>
    <div class="border rounded-md px-2 pb-3">
      <table class="w-full border-spacing-x-6 border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <th class="text-start">ID</th>
            <th class="text-start">Nama pasien</th>
            <th class="text-start">Nama dokter</th>
            <th class="text-start">Poli</th>
            <th class="text-start">Tanggal</th>
            <th class="text-start">Jam mulai</th>
            <th class="text-start">Jam selesai</th>
            <th class="text-start">Keluhan</th>
            <th class="text-start">Penyakit</th>
            <th class="text-start">Resep</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="h-1">
            <td colSpan="9" />
          </tr>
          <tr v-for="ba in bookingActivities2" :key="ba.id">
            <td class="text-start">{{ ba.id }}</td>
            <td class="text-start">{{ ba.patient?.name }}</td>
            <td class="text-start">{{ ba.doctor?.name }}</td>
            <td class="text-start">{{ ba.poli?.name }}</td>
            <td class="text-start">{{ ba.date }}</td>
            <td class="text-start">{{ ba.bookingHour?.starts_at }}</td>
            <td class="text-start">{{ ba.bookingHour?.ends_at }}</td>
            <td class="text-start">{{ ba.keluhan }}</td>
            <td class="text-start">{{ ba.penyakit }}</td>
            <td class="text-start">{{ ba.resep }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
