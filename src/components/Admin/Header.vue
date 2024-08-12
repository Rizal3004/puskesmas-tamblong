<template>
  <header class="px-20 h-16 flex items-center justify-between">
    <div class="flex gap-2">
      <img
        class="w-7"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMzNTg3YjEiIGQ9Ik0yIDE4di0uOHEwLS44NS40MjUtMS41NjJUMy42IDE0LjU1cTEuNDI1LS43MjUgMi45NjMtMS4xNXQzLjEzNy0uNDI1cS4zNSAwIC41NS4zMTN0LjA3NS42NjJxLS4xNS41MjUtLjIyNSAxLjA1dC0uMDc1IDEuMDc1cTAgLjcyNS4xNSAxLjRUMTAuNiAxOC44cS4yLjQyNS0uMDM3LjgxM1Q5LjkgMjBINHEtLjgyNSAwLTEuNDEyLS41ODdUMiAxOG0xNSAwcS44MjUgMCAxLjQxMy0uNTg3VDE5IDE2dC0uNTg3LTEuNDEyVDE3IDE0dC0xLjQxMi41ODhUMTUgMTZ0LjU4OCAxLjQxM1QxNyAxOG0tNy02cS0xLjY1IDAtMi44MjUtMS4xNzVUNiA4dDEuMTc1LTIuODI1VDEwIDR0Mi44MjUgMS4xNzVUMTQgOHQtMS4xNzUgMi44MjVUMTAgMTJtNS44NSA4LjJsLS4xNS0uN3EtLjMtLjEyNS0uNTYyLS4yNjJUMTQuNiAxOC45bC0uNzI1LjIyNXEtLjMyNS4xLS42MzctLjAyNXQtLjQ4OC0uNGwtLjItLjM1cS0uMTc1LS4zLS4xMjUtLjY1dC4zMjUtLjU3NWwuNTUtLjQ3NXEtLjA1LS4zNS0uMDUtLjY1dC4wNS0uNjVsLS41NS0uNDc1cS0uMjc1LS4yMjUtLjMyNS0uNTY3dC4xMjUtLjYzN2wuMjI1LS4zNzVxLjE3NS0uMjc1LjQ3NS0uNHQuNjI1LS4wMjVsLjcyNS4yMjVxLjI3NS0uMi41MzgtLjMzOHQuNTYyLS4yNjJsLjE1LS43MjVxLjA3NS0uMzUuMzM4LS41NjJUMTYuOCAxMWguNHEuMzUgMCAuNjEzLjIyNXQuMzM3LjU3NWwuMTUuN3EuMy4xMjUuNTYyLjI3NXQuNTM4LjM3NWwuNjc1LS4yMjVxLjM1LS4xMjUuNjc1IDB0LjUuNDI1bC4yLjM1cS4xNzUuMy4xMjUuNjV0LS4zMjUuNTc1bC0uNTUuNDc1cS4wNS4zLjA1LjYyNXQtLjA1LjYyNWwuNTUuNDc1cS4yNzUuMjI1LjMyNS41NjN0LS4xMjUuNjM3bC0uMjI1LjM3NXEtLjE3NS4yNzUtLjQ3NS40dC0uNjI1LjAyNUwxOS40IDE4LjlxLS4yNzUuMi0uNTM4LjMzN3QtLjU2Mi4yNjNsLS4xNS43MjVxLS4wNzUuMzUtLjMzNy41NjNUMTcuMiAyMWgtLjRxLS4zNSAwLS42MTItLjIyNXQtLjMzOC0uNTc1Ii8+PC9zdmc+JyBhbHQ="
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
