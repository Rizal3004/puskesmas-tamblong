<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import type { Doctor } from '@/types/Doctor'
import LucideX from '~icons/lucide/x'
import { useBookingActivityStore } from '@/stores/bookingActivityStore'
import { usePoliStore } from '@/stores/poliStore'
import createTimeSlots from '@/utils/createTimeSlots'
import parseTimeRange from '@/utils/parseTimeRange'
import createTimeFromString from '@/utils/createTimeFromString'
import isTime1GreaterThanTime2 from '@/utils/isTime1GreaterThanTime2'
import isTime1GreaterThanOrEqualToTime2 from '@/utils/isTime1GreaterThanOrEqualToTime2'

const props = defineProps<{
  dokter: Doctor
}>()

const { getBookingActivityByDoctorId } = useBookingActivityStore()
const { getPoliById } = usePoliStore()

const baList = getBookingActivityByDoctorId(props.dokter.id)

const computedTimeSlots = computed(() => {
  const dokterStartTime = createTimeFromString(props.dokter.jam_kerja_start!)
  const dokterEndTime = createTimeFromString(props.dokter.jam_kerja_end!)
  return createTimeSlots().map((slot) => {
    const { startTime, endTime } = parseTimeRange(slot.name)
    if (isTime1GreaterThanTime2(dokterStartTime, startTime) || isTime1GreaterThanTime2(endTime, dokterEndTime)) return false
    const isBooked = baList?.some((ba) => {
      const baStartsAt = createTimeFromString(ba.starts_at)
      const baEndsAt = createTimeFromString(ba.ends_at)
      return isTime1GreaterThanOrEqualToTime2(startTime, baEndsAt) && isTime1GreaterThanOrEqualToTime2(baStartsAt, endTime)
    })
    return {
      ...slot,
      isBooked,
    }
  })
})
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class="hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] border bg-white px-[15px] font-semibold leading-none text-grass11 shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
      Lihat
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-blackA9 data-[state=open]:animate-overlayShow" />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Data Dokter
        </DialogTitle>
        <div class="">
          <p>Nama: {{ dokter.name }}</p>
          <p>Jam kerja mulai: {{ dokter.jam_kerja_start }}</p>
          <p>Jam kerja selesai: {{ dokter.jam_kerja_end }}</p>
          <p>Poli: {{ getPoliById(dokter.poli_id)?.name }}</p>
          <select>
            <template v-for="slot in computedTimeSlots">
              <option v-if="slot" :key="slot.id" :value="slot.id">{{ slot.name }}</option>
            </template>
          </select>
        </div>
        <div class="mt-[25px] flex justify-end">
          <DialogClose asChild>
            <!-- <button
              class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
            </button> -->
          </DialogClose>
        </div>
        <DialogClose
          class="absolute right-[10px] top-[10px] inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-grass11 hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none"
          aria-label="Close"
        >
          <LucideX />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
