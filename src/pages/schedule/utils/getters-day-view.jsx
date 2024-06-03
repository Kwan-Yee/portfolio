import { startOfDay, format, addMinutes, addHours } from "date-fns";

/**
 *
 * @param {time} selectedDay
 * @returns An array of time by the hour of the selected day
 */
export const generateHoursAndInterval = (selectedDay) => {
  const hours = [];
  let currentTime = startOfDay(selectedDay);

  for (let hour = 0; hour < 24; hour++) {
    hours.push({
      hour: format(currentTime, "HH:mm"),
      intervals: [
        format(addMinutes(currentTime, 0), "HH:mm"),
        format(addMinutes(currentTime, 15), "HH:mm"),
        format(addMinutes(currentTime, 30), "HH:mm"),
        format(addMinutes(currentTime, 45), "HH:mm"),
      ],
    });
    currentTime = addHours(currentTime, 1);
  }
  return hours;
};
