<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

const carouselItems = [
  {
    title: 'Garda Terdepan Kesehatan Masyarakat',
    description: 'Fasilitas utama layanan kesehatan bagi masyarakat di seluruh wilayah.',
    imgSrc: '/images/slide1.jpg',
  },
  {
    title: 'Inovasi Layanan Puskesmas: Menuju Pelayanan Kesehatan yang Lebih Baik',
    description: 'Puskesmas berinovasi dengan teknologi untuk layanan kesehatan yang lebih baik',
    imgSrc: '/images/slide2.jpg',
  },
  {
    title: 'Membangun Masyarakat Sehat Sejak Dini',
    description: 'Puskesmas fokus pada edukasi dan pencegahan penyakit melalui program imunisasi.',
    imgSrc: '/images/slide3.jpg',
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
      <div class="relative -z-20 flex h-[70vh] w-full flex-col items-center justify-center bg-cover bg-center px-10 text-white md:px-28" :style="{ backgroundImage: `url(${item.imgSrc})` }">
        <div class="absolute -z-10 size-full bg-black opacity-45" />
        <h2 className="text-3xl md:text-5xl font-semibold">{{ item.title }}</h2>
        <p class="mt-4 w-8/12 text-center md:text-xl">{{ item.description }}</p>
        <button className="btn bg-slate-600 text-white border-none mt-7 px-4 py-1 rounded-md hover:bg-sky-600">Bertemu Dokter</button>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <!-- <Pagination /> -->
    </template>
  </Carousel>
</template>
