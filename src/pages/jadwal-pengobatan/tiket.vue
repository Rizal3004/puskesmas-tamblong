<script lang="ts" setup>
import { useVueToPrint } from 'vue-to-print'
import { storeToRefs } from 'pinia'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { usePoliStore } from '@/stores/poliStore'
import createReferenceNumber from '@/utils/createReferenceNumber'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()

const { userBooking } = storeToRefs(useAuthStore())
const { getDoctorById } = useDoctorStore()
const { getPoliById } = usePoliStore()
const { getQueueNumber } = useBookingActivityStore()

const dokter = computed(() => {
  const dokter2 = getDoctorById(userBooking.value!.dokter_id!)
  return dokter2
})

const poli = computed(() => {
  const poli2 = getPoliById(dokter.value!.poli_id)
  return poli2
})
</script>

<template>
  <div>
    <div class="px-4 md:px-36 py-4 space-y-3 border-t">
      <button
        type="button"
        href="/admin/doctors"
        class="flex items-center gap-2 hover:bg-slate-100 px-4 py-1 rounded-xl text-sm md:-translate-x-10 transition-all duration-300 w-fit"
        @click="router.go(-1)"
      >
        <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
        Kembali
      </button>
      <p>Screenshot tiket ini untuk ditunjukkan ke admin</p>
      <div class="px-4 md:px-16 py-6 overflow-x-scroll md:overflow-x-auto border">
        <div class="mb-8">
          <div class="flex items-center gap-5">
            <div class="w-20 aspect-square">
              <img src="/logo_puskesmas-tamblong.png" alt="">
            </div>
            <div class="flex flex-col text-xs">
              <h2 class="font-semibold text-lg">Puskesmas Tamblong</h2>
              <p>No Surat: </p>
              <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
              <p>No Telp. 243214, Email: lkfjasdf, Website: puskesmas-tamblong.vercel.dev</p>
            </div>
          </div>
        </div>
        <h1 class="text-center text-2xl font-semibold">TIKET ANTRIAN BEROBAT</h1>
        <div class="py-2 my-2 flex justify-between">
          <table class="">
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
          <div class="flex flex-col items-center w-3/12">
            <span class="text-2xl font-semibold">Antrian Ke:</span>
            <h1 class="text-6xl font-bold">{{ getQueueNumber(userBooking?.id!) }}</h1>
            <p class="text-center text-sm">Harap Datang 15 Menit sebelum jadwal berobat yang telah ditentukan</p>
          </div>
        </div>
        <p class="text-xl font-semibold text-center">Silahkan membuat antrian baru jika antrian anda terlewatkan</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
