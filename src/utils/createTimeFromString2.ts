export default (dateTimeString: string): Date => {
  // Pisahkan tanggal dan waktu
  const [datePart, timePart] = dateTimeString.split(' ')

  // Pisahkan elemen dari bagian tanggal (tahun, bulan, hari)
  const [year, month, day] = datePart.split('-').map(Number)

  // Pisahkan elemen dari bagian waktu (jam, menit, detik)
  const [hours, minutes, seconds] = timePart.split(':').map(Number)

  // Buat objek Date baru
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(month - 1) // Bulan dalam JavaScript adalah 0-indexed
  date.setDate(day)
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds || 0) // Default ke 0 jika detik tidak disediakan
  date.setMilliseconds(0)

  return date
}
