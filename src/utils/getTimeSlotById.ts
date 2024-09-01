export default (id: string, timeSlots: { id: string, name: string }[]): { start: string, end: string } | undefined => {
  const timeSlot = timeSlots.find(slot => slot.id === id)
  if (timeSlot) {
    const [start, end] = timeSlot.name.split(' - ')
    return { start: `${start}:00`, end: `${end}:00` }
  }
  return undefined
}
