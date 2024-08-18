export default (time1: Date, time2: Date): boolean => {
  const time1InSeconds = time1.getHours() * 3600 + time1.getMinutes() * 60 + time1.getSeconds();
  const time2InSeconds = time2.getHours() * 3600 + time2.getMinutes() * 60 + time2.getSeconds();

  return time1InSeconds > time2InSeconds;
}