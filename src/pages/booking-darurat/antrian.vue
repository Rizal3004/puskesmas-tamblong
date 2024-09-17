<script lang="ts" setup>
import { useRouter } from 'vue-router'
import apiFetch from '@/ofetch'
import type { BookingActivity } from '@/types/BookingActivity'
import type { Doctor } from '@/types/Doctor'
import type { Patient } from '@/types/Patient'
import type { Poli } from '@/types/Poli'
import createReferenceNumber from '@/utils/createReferenceNumber'

const emergencyBookingId = localStorage.getItem('emergency_booking_id')
const router = useRouter()

const queueNumber = ref<number>()
const ba = ref<BookingActivity>()
const isArrived = ref(false)
const poli = ref<Poli>()
const dokter = ref<Doctor>()
const pasien = ref<Patient>()

async function getBookingActivityById(id: number) {
  const { bookingActivity } = await apiFetch<{ bookingActivity: BookingActivity }>(`/booking-activities/${id}`)
  ba.value = bookingActivity
}

async function getQueueNumber(id: number) {
  const { queue } = await apiFetch<{ queue: number }>(`/booking-activities/${id}/queue`)
  queueNumber.value = queue
}

async function getDoctorById(id: number) {
  const doctor = await apiFetch<Doctor>(`/doctors/${id}`)
  dokter.value = doctor
}

async function getPoliById(id: number) {
  const poli2 = await apiFetch<Poli>(`/poli/${id}`)
  poli.value = poli2
}

async function getPatientById(id: number) {
  const patient = await apiFetch<Patient>(`/patients/${id}`)
  pasien.value = patient
}

function handleArrived() {
  const baId = ba.value?.id
  if (baId) {
    apiFetch(`/booking-activities/${baId}/arrived`, {
      method: 'PATCH',
    })
  }

  localStorage.setItem('arrived', 'true')
  isArrived.value = true
}

async function handleCancel() {
  await apiFetch(`/booking-activities/${ba.value?.id}/cancel`, {
    method: 'PATCH',
  })

  localStorage.removeItem('emergency_booking_id')
  localStorage.removeItem('arrived')

  router.replace('/auth/login')
}

onMounted(async () => {
  if (emergencyBookingId) {
    await getBookingActivityById(Number(emergencyBookingId))
    await getQueueNumber(Number(emergencyBookingId))
    await getPatientById(Number(ba.value?.pasien_id))
    if (ba.value) {
      await getDoctorById(Number(ba.value.dokter_id))
    }
    if (dokter.value) {
      await getPoliById(Number(dokter.value.poli_id))
    }

    const arrived = localStorage.getItem('arrived')
    if (arrived === 'true') {
      isArrived.value = true
    }
  }
})
</script>

<template>
  <div id="booking" class="relative block items-center gap-8 px-4 py-16 md:px-36 ">
    <div class="space-y-4">
      <RouterLink to="/auth/login" class="bg-slate-400 text-white rounded-md border px-3 py-0.5 text-sm hover:bg-sky-600">
        Login
      </RouterLink>
      <h3 class="text-3xl" data-aos="fade-up">
        Antrian
      </h3>
      <div class="border px-4 py-6 md:overflow-x-auto md:px-16">
        <div class="mb-8">
          <div class="flex items-center gap-5">
            <div class="aspect-square w-20">
              <img src="/logo_puskesmas-tamblong.png" alt="">
            </div>
            <div class="flex flex-col text-xs">
              <h2 class="text-lg font-semibold">Puskesmas Tamblong</h2>
              <p v-if="ba">No Surat: {{ createReferenceNumber(ba) }}</p>
              <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
              <p>No Telp. +6289668223131, Email: lkfjasdf, Website: puskesmas-tamblong.vercel.dev</p>
            </div>
          </div>
        </div>
        <h1 class="text-center text-2xl font-semibold">TIKET ANTRIAN BEROBAT</h1>
        <div class="my-2 flex flex-col justify-between py-2 md:flex-row">
          <table class="">
            <tbody>
              <tr>
                <td>Nama</td>
                <td>: {{ pasien?.name }}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>: {{ ba?.date }}</td>
              </tr>
              <tr>
                <td>Jam Berobat</td>
                <td>: {{ ba?.starts_at }} - {{ ba?.ends_at }}</td>
              </tr>
              <tr>
                <td>Poli</td>
                <td>: {{ poli?.name }}</td>
              </tr>
              <tr>
                <td>Dokter</td>
                <td>: {{ dokter?.name }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-col items-center py-8 md:w-3/12 md:py-0">
            <span class="text-2xl font-semibold">Antrian Ke:</span>
            <h1 class="text-6xl font-bold">{{ queueNumber }}</h1>
            <p class="text-center text-sm">Harap Datang 15 Menit sebelum jadwal berobat yang telah ditentukan</p>
          </div>
        </div>
        <p class="text-md text-center font-semibold md:text-xl">Silahkan membuat antrian baru jika antrian anda terlewatkan</p>
      </div>
      <div class="flex justify-center gap-8">
        <button class="flex items-center gap-1 rounded-md bg-slate-500 px-3 py-1 text-white hover:bg-red-500" @click="handleCancel">
          <MaterialSymbolsDeleteRounded />
          Batalkan Booking
        </button>
        <button v-if="!isArrived" class="rounded-md bg-green-500 px-3 py-1 text-white" @click="handleArrived">Konfirmasi sampai</button>
        <p v-else class="rounded-md bg-slate-200 px-3 py-1 text-black">Silahkan Menunggu Panggilan. Jika Belum di Panggil Mohon Konfirmasi Ke Admin</p>
      </div>
      <div class="">
        <p class="text-center text-xl">* Konfirmasi admin untuk mendaftarkan akun</p>
      </div>
      <div class="mt-8 flex justify-end">
        <!-- <button class="rounded-md bg-sky-200 px-4 py-0.5" @click="handlePrint2">Print</button> -->
      </div>
    </div>
  </div>
</template>
<!-- update -->
