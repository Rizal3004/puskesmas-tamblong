<script lang="ts" setup>
import { useVueToPrint } from 'vue-to-print'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { usePoliStore } from '@/stores/poliStore'
import createReferenceNumber from '@/utils/createReferenceNumber'

const route = useRoute()
const router = useRouter()
const id = (route.params as any).id

const elementToPrintRef = ref<HTMLElement | null>(null)

const { getBookingActivitybyId } = useBookingActivityStore()
const { getPatientById } = usePatientsStore()
const { getDoctorById } = useDoctorStore()
const { getPoliById } = usePoliStore()

const ba = computed(() => {
  const ba2 = getBookingActivitybyId(id)
  if (!ba2) {
    return null
  }
  const patient = getPatientById(ba2.pasien_id.toString())
  const doctor = getDoctorById(ba2.dokter_id)
  const poli = getPoliById(doctor!.poli_id)
  return {
    ...ba2,
    patient,
    doctor,
    poli,
  }
})

const { handlePrint } = useVueToPrint({
  content: () => elementToPrintRef.value!,
  documentTitle: 'Laporan Data Catatan Pengobatan Pasien',
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
      <div ref="elementToPrintRef" class="overflow-x-scroll border px-4 py-6 md:overflow-x-auto md:px-16">
        <div class="mb-8">
          <div class="flex items-center gap-5">
            <div class="aspect-square w-20">
              <img src="/logo_puskesmas-tamblong.png" alt="">
            </div>
            <div class="flex flex-col text-xs">
              <h2 class="text-lg font-semibold">Puskesmas Tamblong</h2>
              <p>No Surat: {{ createReferenceNumber(ba!) }}</p>
              <p>Alamat: Jl. Tamblong no. 66, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</p>
              <p>No Telp. +6289668223131, Email: lkfjasdf, Website: puskesmas-tamblong.vercel.dev</p>
            </div>
          </div>
        </div>
        <h1 class="text-center text-2xl font-semibold">LAPORAN DATA CATATAN PENGOBATAN PASIEN</h1>
        <div class="my-2 border-y py-2">
          <table class="">
            <tr>
              <td>Nama</td>
              <td>: {{ ba?.patient?.name }}</td>
            </tr>
            <tr>
              <td>NIK</td>
              <td>: {{ ba?.patient?.nik }}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>: {{ ba?.patient?.birthdate ?? '-' }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {{ ba?.patient?.email }}</td>
            </tr>
            <tr>
              <td>Nomor Telepon</td>
              <td>: {{ ba?.patient?.phone ?? '-' }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: {{ ba?.patient?.address ?? '-' }}</td>
            </tr>
          </table>
        </div>
        <table class="w-full border-solid [&>tr>*]:border [&>tr>*]:px-3 [&>tr>*]:text-start">
          <tr>
            <th>Tanggal</th>
            <th>Dokter</th>
            <th>Poli</th>
            <th>Penyakit</th>
            <th>Resep</th>
          </tr>
          <tr>
            <td>{{ ba?.date }}</td>
            <td>{{ ba?.doctor?.name }}</td>
            <td>{{ ba?.poli?.name }}</td>
            <td>{{ ba?.penyakit }}</td>
            <td>{{ ba?.resep }}</td>
          </tr>
        </table>
        <div class="mt-6 flex justify-end">
          <div class="text-sm">
            <p>Kota Bandung, {{ (new Date().toLocaleDateString()).split('/').join('-') }}</p>
            <p>Penanggung Jawab</p>
            <p class="mt-10">Dr. Neil Jackson</p>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-end">
        <button class="rounded-md bg-sky-200 px-4 py-0.5" @click="handlePrint2">Print</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
