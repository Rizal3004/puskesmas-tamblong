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
      <div class="h-[70vh] w-full px-28 flex text-white flex-col relative items-center justify-center bg-center bg-cover -z-20" :style="{backgroundImage: `url(${item.imgSrc})`}">
        <div class="h-full bg-black opacity-45 absolute w-full -z-10" />
        <h2 className="text-5xl font-semibold">{{ item.title }}</h2>
        <p class="text-center w-8/12 mt-4 text-xl">{{ item.description }}</p>
        <button className="btn bg-blue-600 text-white border-none mt-7 px-4 py-1 rounded-md">Bertemu Dokter</button>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <!-- <Pagination /> -->
    </template>
  </Carousel>
</template>
