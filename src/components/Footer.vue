<script lang="ts" setup>
import SolarPhoneBoldDuotone from '~icons/solar/phone-bold-duotone'
import SolarMailboxBoldDuotone from '~icons/solar/mailbox-bold-duotone'
import IcBaselineFacebook from '~icons/ic/baseline-facebook'
import Fa6BrandsXTwitter from '~icons/fa6-brands/x-twitter'
import PhInstagramLogoDuotone from '~icons/ph/instagram-logo-duotone'
import SolarArrowUpLinear from '~icons/solar/arrow-up-linear'
</script>

<template>
  <footer id="kontak" class="flex flex-col gap-6 px-6 py-20 md:block md:px-36">
    <div class="grid gap-10 md:grid-cols-2">
      <div class="space-y-4" data-aos="fade-right">
        <h4 class="text-2xl font-bold">Contact info</h4>
        <p>Hubungi kami di nomor telepon atau email untuk informasi lebih lanjut.</p>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <div class="flex size-8 items-center justify-center rounded-full bg-slate-700">
              <SolarPhoneBoldDuotone class="text-white" />
            </div>
            <span>123123123123</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex size-8 items-center justify-center rounded-full bg-slate-700">
              <SolarMailboxBoldDuotone class="text-white" />
            </div>
            <span>123123123123</span>
          </div>
        </div>
      </div>
      <!-- <div class="space-y-4" data-aos="fade-up">
        <h4 class="text-2xl font-bold">Latest News</h4>
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="rounded-full w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg">
              </div>
            </div>
            <div class="space-y-1">
              <h5>Amazing Technology</h5>
              <p class="text-sm font-light">March 08, 2018</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="rounded-full w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg">
              </div>
            </div>
            <div class="space-y-1">
              <h5>Amazing Technology</h5>
              <p class="text-sm font-light">March 08, 2018</p>
            </div>
          </div>
        </div>
      </div> -->
      <div class="space-y-4" data-aos="fade-left">
        <h4 class="text-2xl font-bold">Opening Hours</h4>
        <div class="space-y-2">
          <p>Monday - Friday: 06:00 AM - 10:00 PM</p>
          <p>Monday - Friday: 06:00 AM - 10:00 PM</p>
          <p>Monday - Friday: 06:00 AM - 10:00 PM</p>
        </div>
        <div class="flex items-center gap-4">
          <IcBaselineFacebook />
          <Fa6BrandsXTwitter />
          <PhInstagramLogoDuotone />
        </div>
      </div>
    </div>
    <a href="#" class="flex items-center">
      <div class="h-0.5 w-full bg-zinc-200" />
      <div class="flex items-center gap-2 rounded-md border p-2">
        <p class="text-nowrap">Back to top</p>
        <SolarArrowUpLinear />
      </div>
    </a>
    <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-10">
      <p>Copyright © 2024 Telkom University | Design : Rizal Ihsan Sihotang</p>
      <div class="flex items-center gap-4">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </footer>
</template>
