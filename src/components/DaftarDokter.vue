<script lang="ts" setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import { useWindowSize } from '@vueuse/core'
import DokterCardDialog from '@/components/Dokter/DokterCardDialog.vue'
import { usePoliStore } from '@/stores/poliStore'
import type { Doctor } from '@/types/Doctor'
import { baseURL } from '@/ofetch'

defineProps<{
  dokterList: Doctor[]
}>()

const { width } = useWindowSize()

const { getPoliById } = usePoliStore()
</script>

<template>
  <Carousel
    :itemsToShow="width < 640 ? 1 : 3"
    :mouseDrag="true"
    :touchDrag="true"
    snapAlign="start"

    class="w-full carousel-dokter"
  >
    <Slide v-for="(dokter) in dokterList" :key="dokter.id">
      <div class="px-2">
        <div
          :key="dokter.id"
          class="flex-col overflow-hidden border shadow-lg carousel-item rounded-lg"
          data-aos="fade-up"
        >
          <img :src="`${baseURL}doctors/image/${dokter.id}`" alt="Burger" class="object-cover w-full aspect-square">
          <div class="px-3 pt-2">
            <p class="text-xl mb-1 capitalize">
              {{ dokter.name }}
            </p>
            <p>{{ getPoliById(dokter.poli_id)?.name }}</p>
            <p class="text-sm">{{ dokter.jam_kerja_start!.toString() }} - {{ dokter.jam_kerja_end!.toString() }}</p>
          </div>
          <div class="flex justify-center py-4">
            <DokterCardDialog :dokter />
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  <!-- <div
    v-for="dokter in dokterList"
    :key="dokter.id"
    class="flex-col overflow-hidden border shadow-lg carousel-item rounded-lg"
    data-aos="fade-up"
  >
    <img :src="`${baseURL}doctors/image/${dokter.id}`" alt="Burger" class="object-cover w-full aspect-square">
    <div class="px-3 pt-2">
      <p class="text-xl mb-1 capitalize">
        {{ dokter.name }}
      </p>
      <p>{{ getPoliById(dokter.poli_id)?.name }}</p>
      <p class="text-sm">{{ dokter.jam_kerja_start!.toString() }} - {{ dokter.jam_kerja_end!.toString() }}</p>
    </div>
    <div class="flex justify-center py-4">
      <DokterCardDialog :dokter />
    </div>
  </div> -->
</template>