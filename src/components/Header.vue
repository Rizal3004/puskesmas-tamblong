<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import MaterialSymbolsMail from '~icons/material-symbols/mail'
import IcBaselineWhatsapp from '~icons/ic/baseline-whatsapp'
import { useAuthStore } from '@/stores/authStore'
import SolarUserRoundedOutline from '~icons/solar/user-rounded-outline'
import SolarHome2Outline from '~icons/solar/home-2-outline'

// const { userBooking } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between border-b px-4 text-xs md:px-36 md:text-base">
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
    <div class="sticky top-0 z-50 flex bg-white px-4 py-2 md:px-36 md:py-4">
      <div class="flex flex-1 items-center gap-2">
        <img src="/logo_puskesmas-tamblong.png" alt="" class="aspect-square w-9 object-contain">
        <h1 class="text-base font-semibold md:text-xl">
          Puskesmas Tamblong
        </h1>
      </div>
      <div class="hidden flex-none gap-5 md:flex">
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
        <a href="/#booking" class="rounded-md bg-slate-700 px-4 py-1 text-white">
          Booking Dokter
        </a>
      </div>

      <!-- <RouterLink to="/mobile-navigation">
        <SolarHamburgerMenuLinear />
      </RouterLink> -->
    </div>
    <div class="flex items-center justify-end gap-4 border-t px-4 py-2 md:hidden">
      <RouterLink to="/" class="flex items-center gap-1 text-xs">
        <SolarHome2Outline />
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/profile" class="flex items-center gap-1 text-xs">
        <SolarUserRoundedOutline />
        <span>Profile</span>
      </RouterLink>
    </div>
  </div>
</template>
