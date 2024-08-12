<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import SolarCheckCircleBoldDuotone from '~icons/solar/check-circle-bold-duotone'
import SolarDocumentBoldDuotone from '~icons/solar/document-bold-duotone'

defineProps<{
  keluhan: string
}>()
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class=""
    >
      <SolarDocumentBoldDuotone class="text-zinc-500" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Keluhan Pasien
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          <p>{{ keluhan }}</p>
        </DialogDescription>
        <div class="mt-[25px] flex gap-4 justify-end">
          <DialogClose asChild>
            <button
              class="bg-slate-100 text-slate-600 hover:bg-slate-200 focus:shadow-slate-300 transition-all duration-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Oke
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
