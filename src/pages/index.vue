<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePoliStore } from '@/stores/poliStore'
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import BookingForm from '@/components/BookingForm.vue'
import Footer from '@/components/Footer.vue'
import { baseURL } from '@/ofetch'
import DokterCardDialog from '@/components/Dokter/DokterCardDialog.vue'
import DaftarDokter from '@/components/DaftarDokter.vue'

const { getPoliById, poliList } = usePoliStore()
const { doctorList } = useDoctorStore()
const { userBooking } = storeToRefs(useAuthStore())

const selectedPoliId = ref<number | null>(null)

const computedDoctors = computed(() => {
  return doctorList.filter((dokter) => {
    if (selectedPoliId.value === null) return true
    return dokter.poli_id === selectedPoliId.value
  })
})
</script>

<template>
  <div class="">
    <Header class="-z-20" />
    <Hero />
    <!-- About ===================================================================================== -->
    <div id="about" class="px-6 md:px-36 pt-10 md:pt-0 md:h-[80dvh] md:flex items-center bg-[#f5f5f5] relative overflow-hidden">
      <div class="md:w-7/12 space-y-8">
        <h2 class="text-xl md:text-6xl font-bold" data-aos="fade-up">
          Selamat Datang di Puskesmas Tamblong
        </h2>
        <div class="space-y-2" data-aos="fade-up">
          <p>Puskesmas adalah pusat layanan kesehatan pertama untuk masyarakat di setiap daerah. Mereka menyediakan pemeriksaan, pengobatan, dan edukasi kesehatan.</p>
          <p>Dengan peran penting dalam pencegahan penyakit, Puskesmas juga menjalankan program imunisasi. Mereka memastikan akses kesehatan yang mudah dan terjangkau bagi semua.</p>
        </div>
        <div class="flex gap-4" data-aos="fade-up">
          <div class="avatar">
            <div class="w-16 rounded-full aspect-square overflow-hidden">
              <img src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">
              Dr. Neil Jackson
            </h3>
            <p>General Principal</p>
          </div>
        </div>
      </div>
      <img
        src="/images/about-bg.jpg"
        alt=""
        class="md:absolute right-32 w-1/2 mx-auto md:mx-0 md:w-4/12 bottom-[-30%]"
        data-aos="fade-up"
      >
    </div>

    <!-- Cards Dokter =========================================================================== -->
    <div id="info-dokter" class="py-6 md:py-20 px-6 md:px-36 space-y-8 md:space-y-0">
      <div class="flex md:flex-row flex-col justify-between md:items-center">
        <h2 class="mb-6 text-3xl font-semibold" data-aos="fade-up">
          Daftar Dokter
        </h2>
        <div class="flex flex-col">
          <p>Filter Poli</p>
          <select v-model="selectedPoliId" class="border">
            <option :value="null">Semua</option>
            <option v-for="poli in poliList" :key="poli.id" :value="poli.id">{{ poli.name }}</option>
          </select>
        </div>
      </div>
      <div class="gap-6 px-4 pb-8">
        <DaftarDokter v-if="computedDoctors.length > 0" :dokterList="computedDoctors" />
        <div v-else class="">
          <p>Belum ada dokter</p>
        </div>
      </div>
    </div>

    <!-- Booking Dokter ======================================================================================== -->
    <BookingForm v-if="!userBooking" />

    <!-- Map =========================================================================== -->
    <section id="google-map" data-aos="fade-up">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7684332001218!2d107.61271279999998!3d-6.9182644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62f199d7435%3A0x8871ebc46b4346de!2sUPTD%20Puskesmas%20Tamblong!5e0!3m2!1sen!2sus!4v1703584734786!5m2!1sen!2sus"
        width="100%"
        height="350"
        frameborder="0"
        style="border: 0"
        allowfullscreen
      />
    </section>
    <Footer />
  </div>
</template>
