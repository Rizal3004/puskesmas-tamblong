<script lang="ts" setup>
import AdminHeader from '@/components/Admin/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <AdminHeader />
    <main class="mx-2 min-h-[calc(100vh-5rem)] space-y-3 rounded-xl bg-white px-12 py-6 shadow-inner">
      <RouterView />
    </main>
  </div>
</template>
