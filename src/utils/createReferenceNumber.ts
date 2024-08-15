import type { BookingActivity } from '@/types/BookingActivity'

function formatNumber(num: number): string {
  return num.toString().padStart(3, '0')
}

export default (ba: BookingActivity) => {
  const baIdFormatted = formatNumber(ba.id)
  const baPatientType = ba.patient_type.toUpperCase()
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const referenceNumber = `${baIdFormatted}/${baPatientType}/${currentMonth}/${currentYear}`
  return referenceNumber
}
