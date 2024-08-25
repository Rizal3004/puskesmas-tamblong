<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import MaterialSymbolsMail from '~icons/material-symbols/mail'
import IcBaselineWhatsapp from '~icons/ic/baseline-whatsapp'
import { useAuthStore } from '@/stores/authStore'
import SolarUserRoundedOutline from '~icons/solar/user-rounded-outline'
import SolarHome2Outline from '~icons/solar/home-2-outline'

const { userBooking } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="flex items-center justify-between border-b px-4 md:px-36 md:text-base text-xs">
    <p>Selamat Datang</p>
    <div class="flex divide-x">
      <a class="flex items-center gap-2 px-4 py-2.5" href="https://wa.me/6289668223131" target="_blank">
        <IcBaselineWhatsapp class="text-green-500" />
        <span>Whatsapp</span>
      </a>
      <div class="flex items-center gap-2 px-4 py-2.5">
        <MaterialSymbolsMail class="text-blue-500" />
        <span>Email</span>
      </div>
    </div>
  </div>
  <div class="sticky top-0 z-50 flex md:px-36 px-4 py-2 md:py-4 bg-white">
    <div class="flex-1 flex items-center gap-2">
      <img src="/logo_puskesmas-tamblong.png" alt="" class="w-9 object-contain aspect-square">
      <h1 class="text-base md:text-xl font-semibold">
        Puskesmas Tamblong
      </h1>
    </div>
    <div class="flex-none hidden md:flex gap-5">
      <div class="flex">
        <a href="/#" class="px-4 py-1">
          Home
        </a>
        <a href="/#about" class="px-4 py-1">
          Tentang Kami
        </a>
        <a href="/#info-dokter" class="px-4 py-1">
          Info Dokter
        </a>
        <RouterLink to="/profile" class="px-4 py-1">Profil</RouterLink>
      </div>
      <a v-if="!userBooking" href="/#booking" class="px-4 py-1 bg-slate-700 text-white rounded-md">
        Booking Dokter
      </a>
      <template v-else>
        <RouterLink to="/jadwal-pengobatan" class="px-4 py-1 bg-slate-700 text-white rounded-md">
          Jadwal Pengobatan
        </RouterLink>
      </template>
    </div>

    <!-- <RouterLink to="/mobile-navigation">
      <SolarHamburgerMenuLinear />
    </RouterLink> -->
  </div>
  <div class="md:hidden px-4 py-2 border-t flex items-center justify-end gap-4">
    <RouterLink to="/" class="flex items-center text-xs gap-1">
      <SolarHome2Outline />
      <span>Home</span>
    </RouterLink>
    <RouterLink to="/profile" class="flex items-center text-xs gap-1">
      <SolarUserRoundedOutline />
      <span>Profile</span>
    </RouterLink>
    <RouterLink v-if="userBooking" to="/jadwal-pengobatan" class="text-xs md:text-base w-fit block md:hidden px-4 py-1 bg-slate-700 text-white rounded-md">
      Jadwal Pengobatan
    </RouterLink>
  </div>
</template>
