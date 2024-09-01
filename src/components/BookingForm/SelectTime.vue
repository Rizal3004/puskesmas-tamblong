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
import createTimeSlots from '@/utils/createTimeSlots'
import getTimeSlotById from '@/utils/getTimeSlotById'

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
      class="hover:bg-mauve3 inline-flex h-[35px] min-w-[160px] items-center justify-between gap-[5px] rounded border bg-white px-[15px] text-[13px] leading-none text-blackA10 outline-none data-[placeholder]:text-blackA9"
      aria-label="Customise options"
    >
      <SelectValue placeholder="Pilih waktu" />
      <RadixIconsChevronDown
        class="size-3.5"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] min-w-[160px] rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
        :sideOffset="5"
      >
        <SelectScrollUpButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <RadixIconsChevronUp />
        </SelectScrollUpButton>

        <SelectViewport class="p-[5px]">
          <SelectLabel class="text-mauve11 px-[25px] text-xs leading-[25px]">
            Jam Booking
          </SelectLabel>
          <SelectGroup>
            <SelectItem
              v-for="{ id, name } in createTimeSlots()"
              :key="id"
              class="data-[disabled]:text-mauve8 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-blackA9 data-[highlighted]:text-white data-[highlighted]:outline-none"
              :value="id.toString()"
            >
              <SelectItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <RadixIconsCheck />
              </SelectItemIndicator>
              <SelectItemText>
                {{ name }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
          <RadixIconsChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
