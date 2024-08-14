<script lang="ts" setup>
import { useVueToPrint } from 'vue-to-print'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { usePoliStore } from '@/stores/poliStore'

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
</script>

<template>
  <div>
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
      <div class="px-16 py-6" ref="elementToPrintRef">
        <h1 class="text-center text-2xl font-semibold">LAPORAN DATA CATATAN PENGOBATAN PASIEN</h1>
        <div class="border-y py-2 my-2">
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
        <table class="w-full border-solid [&>tr>*]:border [&>tr>*]:text-start [&>tr>*]:px-3">
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
      </div>
      <div class="flex justify-end mt-8">
        <button class="bg-sky-200 px-4 py-0.5 rounded-md" @click="handlePrint">Print</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
