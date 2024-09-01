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

const { bookingActivityId } = defineProps<{
  bookingActivityId: number
}>()
const emit = defineEmits<{
  done: [bookingActivityId: number, penyakit: string, resep: string]
}>()
const penyakit = ref('')
const resep = ref('')
const aturanMinum = ref('')

function handleSubmit() {
  const resep2 = `${resep.value}::${aturanMinum.value}`
  emit('done', bookingActivityId, penyakit.value, resep2)
}
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class=""
    >
      <SolarCheckCircleBoldDuotone class="text-green-500" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-blackA9 data-[state=open]:animate-overlayShow" />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          Konfirmasi Selesai
        </DialogTitle>
        <DialogDescription class="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
          <div class="flex flex-col gap-2">
            <p>
              Masukkan penyakit dan resep yang diberikan kepada pasien
            </p>
            <label class="flex flex-col gap-1">
              Penyakit
              <input
                v-model="penyakit"
                placeholder="Masukkan Penyakit"
                type="text"
                class="rounded-md border px-2 py-1"
                required
              >
            </label>
            <label class="flex flex-col gap-1">
              Resep
              <textarea
                v-model="resep"
                placeholder="Masukkan Resep"
                class="rounded-md border px-2 py-1"
                required
              />
            </label>
            <label class="flex flex-col gap-1">
              Aturan Minum
              <textarea
                v-model="aturanMinum"
                placeholder="Masukkan Aturan Minum"
                class="rounded-md border px-2 py-1"
                required
              />
            </label>
          </div>
        </DialogDescription>
        <div class="mt-[25px] flex justify-end gap-4">
          <DialogClose asChild>
            <button
              class="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-slate-100 px-[15px] font-semibold leading-none text-slate-600 transition-all duration-300 hover:bg-slate-200 focus:shadow-[0_0_0_2px] focus:shadow-slate-300 focus:outline-none"
            >
              Batal
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              class="reen inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-200 px-[15px] font-semibold leading-none transition-all duration-300 hover:bg-green-400 hover:text-green-800 focus:shadow-[0_0_0_2px] focus:shadow-green-300 focus:outline-none"
              @click="handleSubmit"
            >
              Selesai
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
