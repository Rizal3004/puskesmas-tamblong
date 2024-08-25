<template>
  <header class="px-20 h-16 flex items-center justify-between">
    <div class="flex gap-2">
      <img
        class="w-7 object-contain aspect-square"
        src="/logo_puskesmas-tamblong.png"
      >
      <div class="*:block -space-y-1">
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
