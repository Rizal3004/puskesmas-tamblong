<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { useDoctorStore } from '@/stores/doctorStore'
import { usePatientsStore } from '@/stores/patientsStore'
import { usePoliStore } from '@/stores/poliStore'
import LoadingScreen from '@/components/loadingScreen.vue'

const { getBookingActivity } = useBookingActivityStore()
const { getAllPoli } = usePoliStore()
const { getAllPatients } = usePatientsStore()
const { getAllDoctors } = useDoctorStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await getAllPoli()
  await getBookingActivity()
  await getAllPatients()
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
