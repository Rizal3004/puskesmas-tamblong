<script lang="ts" setup>


// import { useBookingActivityStore } from '@/stores/bookingActivityStore'

// const router = useRouter()

// const { getBookingActivitybyId, handleChangeBookingDate } = useBookingActivityStore()
// const bookingId = Number((useRoute().params as { id: string }).id,
// )

// const bookingActivityUpdateForm = reactive({
//   date: '',
//   jamMulai: '',
//   jamSelesai: '',
// })

// function handleSubmit() {
//   handleChangeBookingDate(bookingId, bookingActivityUpdateForm.date)
//   handleChangeBookingHour(bookingId, {
//     starts_at: bookingActivityUpdateForm.jamMulai,
//     ends_at: bookingActivityUpdateForm.jamSelesai,
//   })

//   router.go(-1)
// }

// onMounted(async () => {
//   const ba = getBookingActivitybyId(bookingId)
//   if (!ba) return
//   const bh = getBookingHourById(ba?.booking_hours_id)
//   if (!bh) return
//   bookingActivityUpdateForm.date = ba.date.split('T')[0]

//   bookingActivityUpdateForm.jamMulai = bh?.starts_at
//   bookingActivityUpdateForm.jamSelesai = bh?.ends_at
// })

// definePage({
//   name: 'EditDataBooking',
// }) 
</script>

<template>
  <div class="">
    tes
  </div>
  <!--
  <button
    type="button"
    class="flex items-center gap-2 hover:bg-slate-100 px-4 py-1 rounded-xl text-sm -translate-x-10 transition-all duration-300 w-fit"
    @click="router.go(-1)"
  >
    <img src="https://api.iconify.design/material-symbols-light:arrow-back-rounded.svg?color=%236e6e6e" alt="">
    Kembali
  </button>
  <h1 class="text-2xl font-semibold">
    Edit Data Booking
  </h1>
  <div class="">
    <form class="grid grid-cols-2 gap-y-2 gap-x-5" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label>Tanggal</label>
        <input
          v-model="bookingActivityUpdateForm.date"
          type="date"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Jam Mulai</label>
        <input
          v-model="bookingActivityUpdateForm.jamMulai"
          type="time"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex flex-col">
        <label>Jam Selesai</label>
        <input
          v-model="bookingActivityUpdateForm.jamSelesai"
          type="time"
          class="border py-1 px-3 rounded-md"
        >
      </div>
      <div class="flex items-end">
        <button type="submit" class="w-full h-10 bg-blue-400 rounded-md text-white"> Ganti Jadwal </button>
      </div>
    </form>
  </div>-->
</template> 