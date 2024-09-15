export default (): { id: string, name: string }[] => {
  const timeSlots: { id: string, name: string }[] = []
  let id = 1

  for (let hour = 8; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const startHour = hour.toString().padStart(2, '0')
      const startMinute = minute.toString().padStart(2, '0')
      const endHour = (minute === 45 ? hour + 1 : hour).toString().padStart(2, '0')
      const endMinute = (minute + 15) % 60 === 0 ? '00' : (minute + 15).toString().padStart(2, '0')

      const start = `${startHour}:${startMinute}`
      const end = `${endHour}:${endMinute}`
      timeSlots.push({ id: id.toString(), name: `${start} - ${end}` })
      id++
    }
  }

  return timeSlots
}
