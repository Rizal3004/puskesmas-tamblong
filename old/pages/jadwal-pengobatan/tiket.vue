<!-- <script lang="ts" setup>
import { useVueToPrint } from 'vue-to-print'
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import { useAuthStore } from '@/stores/authStore'
import createReferenceNumber from '@/utils/createReferenceNumber'
import { usePatientsStore } from '@/stores/patientsStore'
import capitalizeFirstLetterOfEachWord from '@/utils/capitalizeFirstLetterOfEachWord'

const router = useRouter()

const { getDoctorById } = useDoctorStore()
const { getPoliById } = usePoliStore()
const { getPatientById } = usePatientsStore()
const { getQueueNumber } = useBookingActivityStore()

const dokter = computed(() => {
  const dokter2 = getDoctorById(userBooking.value!.dokter_id!)
  return dokter2
})

const poli = computed(() => {
  const poli2 = getPoliById(dokter.value!.poli_id)
  return poli2
})

const elementToPrintRef = ref<HTMLElement | null>(null)
const { handlePrint } = useVueToPrint({
  content: () => elementToPrintRef.value!,
  documentTitle: 'TIKET ANTRIAN BEROBAT',
})

function handlePrint2() {
  handlePrint()
}
</script>

<template>
  <div>
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
      <p>Screenshot tiket ini untuk ditunjukkan ke admin</p>
      <div ref="elementToPrintRef" class="border px-4 py-6 md:overflow-x-auto md:px-16">
        <div class="mb-8">
          <div class="flex items-center gap-5">
            <div class="aspect-square w-20">
              <img src="/logo_puskesmas-tamblong.png" alt="">
            </div>
            <div class="flex flex-col text-xs">
              <h2 class="text-lg font-semibold">Puskesmas Tamblong</h2>
              <p>No Surat: {{ createReferenceNumber(userBooking!) }}</p>
              <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
              <p>No Telp. +6289668223131, Email: lkfjasdf, Website: puskesmas-tamblong.vercel.dev</p>
            </div>
          </div>
        </div>
        <h1 class="text-center text-2xl font-semibold">TIKET ANTRIAN BEROBAT</h1>
        <div class="my-2 flex flex-col justify-between py-2 md:flex-row">
          <table class="">
            <tr>
              <td>Tanggal</td>
              <td>: {{ capitalizeFirstLetterOfEachWord(getPatientById(userBooking?.pasien_id!.toString()!)?.name!) }}</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>: {{ userBooking?.date }}</td>
            </tr>
            <tr>
              <td>Jam Berobat</td>
              <td>: {{ userBooking?.starts_at }} - {{ userBooking?.ends_at }}</td>
            </tr>
            <tr>
              <td>Poli</td>
              <td>: {{ poli?.name }}</td>
            </tr>
            <tr>
              <td>Dokter</td>
              <td>: {{ dokter?.name }}</td>
            </tr>
          </table>
          <div class="flex flex-col items-center py-8 md:w-3/12 md:py-0">
            <span class="text-2xl font-semibold">Antrian Ke:</span>
            <h1 class="text-6xl font-bold">{{ getQueueNumber(userBooking?.id!) }}</h1>
            <p class="text-center text-sm">Harap Datang 15 Menit sebelum jadwal berobat yang telah ditentukan</p>
          </div>
        </div>
        <p class="text-md text-center font-semibold md:text-xl">Silahkan membuat antrian baru jika antrian anda terlewatkan</p>
      </div>
      <div class="mt-8 flex justify-end">
        <button class="rounded-md bg-sky-200 px-4 py-0.5" @click="handlePrint2">Print</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style> -->
