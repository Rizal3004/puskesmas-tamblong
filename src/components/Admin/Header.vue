<template>
  <header class="flex h-16 items-center justify-between px-20">
    <div class="flex gap-2">
      <img
        class="aspect-square w-7 object-contain"
        src="/logo_puskesmas-tamblong.png"
      >
      <div class="-space-y-1 *:block">
        <span class="font-semibold">Admin</span>
        <span class="text-xs">Puskesmas Tamblong</span>
      </div>
    </div>
    <div class="flex gap-6">
      <RouterLink to="/admin/pasien">Data Pasien</RouterLink>
      <RouterLink to="/admin/dokter">Data Dokter</RouterLink>
      <RouterLink to="/admin/riwayat">Riwayat</RouterLink>
      <RouterLink to="/admin/booking">Data Booking</RouterLink>
    </div>
  </header>
</template>
