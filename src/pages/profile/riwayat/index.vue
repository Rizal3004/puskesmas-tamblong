<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { useDoctorStore } from '@/stores/doctorStore'
import ShowKeluhan from '@/components/Booking/ShowKeluhan.vue'
import { useAuthStore } from '@/stores/authStore'
import Header from '@/components/Header.vue'

const { bookingActivityList } = storeToRefs(useBookingActivityStore())
const { profile } = useAuthStore()
const { getPatientById } = usePatientsStore()
const { getDoctorById } = useDoctorStore()

const router = useRouter()

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
    if (ba.pasien_id === profile?.id) {
      return true
    }
    return false
  }).sort((a, b) => {
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
    <div class="px-36 py-4 space-y-3 border-t">
      <button
        type="button"
        href="/admin/doctors"
        class="flex items-center gap-2 hover:bg-slate-100 px-4 py-1 rounded-xl text-sm -translate-x-10 transition-all duration-300 w-fit"
        @click="router.go(-1)"
      >
        <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
        Kembali
      </button>
      <div class="flex justify-between">
        <h1 class="text-2xl font-semibold">Riwayat Booking</h1>
      </div>
      <div class="border rounded-md px-2 pb-3">
        <table class="w-full border-spacing-x-6 border-separate">
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
            <tr class="h-1">
              <td colSpan="9" />
            </tr>
            <tr v-for="ba in bookingActivities2" :key="ba.id">
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
                <RouterLink :to="`/profile/riwayat/${ba.id}`" class="bg-sky-200 px-3 py-0.5 rounded-md">Detail</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
