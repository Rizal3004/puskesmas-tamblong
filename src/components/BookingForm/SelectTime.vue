<script setup lang="ts">
import { ref } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import RadixIconsChevronDown from '~icons/radix-icons/chevron-down'
import RadixIconsCheck from '~icons/radix-icons/check'
import RadixIconsChevronUp from '~icons/radix-icons/chevron-up'

function createTimeSlots(): { id: string, name: string }[] {
  const timeSlots: { id: string, name: string }[] = []
  let id = 1

  for (let hour = 8; hour <= 16; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`
    timeSlots.push({ id: id.toString(), name: `${start} - ${end}` })
    id++
  }

  return timeSlots
}

function getTimeSlotById(id: string, timeSlots: { id: string, name: string }[]): { start: string, end: string } | undefined {
  const timeSlot = timeSlots.find(slot => slot.id === id)
  if (timeSlot) {
    const [start, end] = timeSlot.name.split(' - ')
    return { start: `${start}:00`, end: `${end}:00` }
  }
  return undefined
}

const selectedValue = ref<string>('')

const startAtValue = defineModel<string>('startsAt', { required: true })
const endsAtValue = defineModel<string>('endsAt', { required: true })

watchEffect(() => {
  const timeSlot = getTimeSlotById(selectedValue.value, createTimeSlots())
  if (timeSlot) {
    startAtValue.value = timeSlot.start
    endsAtValue.value = timeSlot.end
  }
})
</script>

<template>
  <SelectRoot v-model="selectedValue" required>
    <SelectTrigger
      class="inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-blackA10 hover:bg-mauve3 border data-[placeholder]:text-blackA9 outline-none"
      aria-label="Customise options"
    >
      <SelectValue placeholder="Pilih waktu" />
      <RadixIconsChevronDown
        class="h-3.5 w-3.5"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
        :sideOffset="5"
      >
        <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RadixIconsChevronUp />
        </SelectScrollUpButton>

        <SelectViewport class="p-[5px]">
          <SelectLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
            Jam Booking
          </SelectLabel>
          <SelectGroup>
            <SelectItem
              v-for="{ id, name } in createTimeSlots()"
              :key="id"
              class="text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blackA9 data-[highlighted]:text-white"
              :value="id.toString()"
            >
              <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <RadixIconsCheck />
              </SelectItemIndicator>
              <SelectItemText>
                {{ name }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <RadixIconsChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
