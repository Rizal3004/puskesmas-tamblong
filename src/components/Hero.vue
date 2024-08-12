<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

const carouselItems = [
  {
    title: 'Slide 1',
    description: 'Healthy Living',
  },
  {
    title: 'Slide 2',
    description: 'Healthy Living',
  },
  {
    title: 'Slide 3',
    description: 'Healthy Living',
  },
]
</script>

<template>
  <Carousel
    :itemsToShow="1"
    :autoplay="5000"
    :mouseDrag="true"
    :touchDrag="true"
    wrapAround
  >
    <Slide v-for="(item, i) in carouselItems" :key="i">
      <div class="bg-sky-100 h-[70vh] w-full flex flex-col items-center justify-center">
        <p>{{ item.description }}</p>
        <h2 className="text-7xl">{{ item.title }}</h2>
        <button className="btn bg-blue-600 text-white border-none mt-7 px-4 py-1 rounded-md">Bertemu Dokter</button>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <!-- <Pagination /> -->
    </template>
  </Carousel>
</template>
