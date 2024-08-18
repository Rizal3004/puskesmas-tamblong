import createTimeFromString from "./createTimeFromString"

export default (timeRange: string): { startTime: Date, endTime: Date } => {
  const [start, end] = timeRange.split(' - ');

  const startTime = createTimeFromString(start);
  const endTime = createTimeFromString(end);

  return { startTime, endTime };
}