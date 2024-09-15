export default (timeStr: string): Date => {
  // Mendapatkan tanggal sekarang untuk memastikan hanya waktu yang diubah
  const currentDate = new Date()

  // Pisahkan jam, menit, dan detik berdasarkan ":"
  const timeParts = timeStr.split(':')

  // Parsing jam, menit, dan detik (jika ada)
  const hours = Number.parseInt(timeParts[0], 10)
  const minutes = Number.parseInt(timeParts[1], 10)
  const seconds = timeParts.length === 3 ? Number.parseInt(timeParts[2], 10) : 0 // Default detik ke 0 jika tidak ada

  // Set jam, menit, dan detik pada tanggal sekarang
  currentDate.setHours(hours, minutes, seconds, 0) // Milidetik di-set ke 0

  return currentDate
}
