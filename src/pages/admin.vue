<script lang="ts" setup>
import AdminHeader from '@/components/Admin/Header.vue'
</script>

<template>
  <div class="bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
    <AdminHeader />
    <main class="px-12 py-6 space-y-3 min-h-[calc(100vh-5rem)] rounded-xl bg-white mx-2 shadow-inner">
      <RouterView />
    </main>
  </div>
</template>
