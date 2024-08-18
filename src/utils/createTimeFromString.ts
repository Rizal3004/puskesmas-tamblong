export default (timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || 0); // Default to 0 if seconds are not provided
  date.setMilliseconds(0);

  return date;
}