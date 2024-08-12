<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useBookingHoursStore } from '@/stores/bookingHoursStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { usePoliStore } from '@/stores/poliStore'
import LoadingScreen from '@/components/loadingScreen.vue'

const { getBookingActivity } = useBookingActivityStore()
const { getBookingHours } = useBookingHoursStore()
const { getAllPoli } = usePoliStore()
const { getAllPatients } = usePatientsStore()
const { getAllDoctors } = useDoctorStore()
const { getUserData } = useAuthStore()

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await getUserData()
  await getAllPoli()
  await getBookingActivity()
  await getAllPatients()
  await getBookingHours()
  await getAllDoctors()
  isLoading.value = false
})
</script>

<template>
  <div v-if="!isLoading">
    <RouterView />
  </div>
  <LoadingScreen v-else />
</template>
