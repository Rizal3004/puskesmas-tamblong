export default (
  timeSlotStart: Date,
  timeSlotEnd: Date,
  baStart: Date,
  baEnd: Date,
): boolean => {
  // Memeriksa apakah timeSlotStart >= baStart dan timeSlotEnd <= baEnd
  return timeSlotStart >= baStart && timeSlotEnd <= baEnd
}
