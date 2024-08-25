<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { useDoctorStore } from '@/stores/doctorStore'
import BookingDoneConfirmationDialog from '@/components/Booking/DoneConfirmationDialog.vue'
import BookingDeleteDialog from '@/components/Booking/DeleteDialog.vue'
import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded'
import MaterialSymbolsNestClockFarsightAnalogOutlineRounded from '~icons/material-symbols/nest-clock-farsight-analog-outline-rounded'
import ShowKeluhan from '@/components/Booking/ShowKeluhan.vue'
import extractTime from '@/utils/extractTime'
import { usePoliStore } from '@/stores/poliStore'

const { bookingActivityList } = storeToRefs(useBookingActivityStore())
const { handleDoneBooking, handleCancelBooking, getQueueNumber, refetchBookingActivity } = useBookingActivityStore()
const { getPatientById } = usePatientsStore()
const { getDoctorById } = useDoctorStore()
const { poliList } = usePoliStore()

const poliId = ref<number>()

const searchText = ref('')
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
    const activeBooking = ba.status === 'booked'
    if (ba.patient?.name?.toLowerCase().startsWith(searchText.value) && activeBooking && (!poliId.value || ba.doctor?.poli_id === poliId.value)) {
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

async function handleCancel(bookingActivityId: number) {
  await handleCancelBooking(bookingActivityId)
}

async function handleDone(bookingActivityId: number, penyakit: string, resep: string) {
  await handleDoneBooking(bookingActivityId, { resep, penyakit })
}

let intervalId: NodeJS.Timeout

onMounted(() => {
  intervalId = setInterval(refetchBookingActivity, 1000 * 20)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="space-y-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Data Booking</h1>
      <div class="flex items-center gap-8">
        <div class="">
          <label for="search">Cari Pasien:</label>
          <input
            v-model="searchText"
            class="rounded-md px-2 py-0.5 border mx-2"
            type="text"
          >
        </div>
        <select v-model="poliId" class="border px-4 py-1 rounded-md">
          <option :value="undefined">Semua Poli</option>
          <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
        </select>
      </div>
    </div>
    <div class="border rounded-md px-2 pb-3">
      <table class="w-full border-spacing-x-6 border-separate">
        <thead class="border-b">
          <tr class="h-12">
            <!-- <th class="text-start">ID</th> -->
            <th class="text-start" />
            <th class="text-start">Nama pasien</th>
            <th class="text-start">Jenis pasien</th>
            <th class="text-start">No WA pasien</th>
            <th class="text-start">Nama dokter</th>
            <th class="text-start">Tanggal</th>
            <th class="text-start">Jam</th>
            <th class="text-start">Nomor Antrian</th>
            <!-- <th class="text-start">Status</th> -->
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
            <td class="text-start">
              <MaterialSymbolsCheckRounded
                v-if="ba.arrived_at"
                class="text-green-400"
              />
              <MaterialSymbolsNestClockFarsightAnalogOutlineRounded
                v-else
                class="text-amber-400"
              />
            </td>
            <td class="text-start">{{ ba.patient?.name }}</td>
            <td class="text-start">{{ ba.patient_type === 'umum' ? 'Umum' : `BPJS (${ba.bpjs_number})` }}</td>
            <td class="text-start">{{ ba.patient?.phone }}</td>
            <td class="text-start">{{ ba.doctor?.name }}</td>
            <td class="text-start">{{ ba.date }}</td>
            <td class="text-start">{{ ba?.starts_at }} - {{ ba?.ends_at }}</td>
            <td class="text-start">{{ getQueueNumber(ba.id) }}</td>
            <!-- <td class="text-start">{{ ba.status }}</td> -->
            <td class="text-start">
              <div class="flex items-center gap-2">
                {{ ba.keluhan }}
                <ShowKeluhan :keluhan="ba.keluhan!" />
              </div>
            </td>
            <td class="text-start">
              <div class="flex items-center gap-2 pl-10">
                <!-- <RouterLink :to="`/admin/booking/${ba.id}`">
                  <SolarPenBoldDuotone class="text-orange-400" />
                </RouterLink> -->
                <BookingDoneConfirmationDialog :bookingActivityId="ba.id" @done="handleDone" />
                <BookingDeleteDialog :bookingActivityId="ba.id" @delete="handleCancel" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
