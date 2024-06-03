import { add, isSameMonth, startOfWeek } from "date-fns";

export const getDaysForMonthViews = (firstDayofMonth, startsAt) => {
  const weeks = [];
  let firstDay = add(startOfWeek(firstDayofMonth), { days: startsAt });
  weeks.push({
    0: firstDay,
    1: add(firstDay, { days: 1 }),
    2: add(firstDay, { days: 2 }),
    3: add(firstDay, { days: 3 }),
    4: add(firstDay, { days: 4 }),
    5: add(firstDay, { days: 5 }),
    6: add(firstDay, { days: 6 }),
  });
  firstDay = add(firstDay, { weeks: 1 });

  while (isSameMonth(firstDay, firstDayofMonth) || weeks.length < 6) {
    weeks.push({
      0: firstDay,
      1: add(firstDay, { days: 1 }),
      2: add(firstDay, { days: 2 }),
      3: add(firstDay, { days: 3 }),
      4: add(firstDay, { days: 4 }),
      5: add(firstDay, { days: 5 }),
      6: add(firstDay, { days: 6 }),
    });

    firstDay = add(firstDay, { weeks: 1 });
  }

  return weeks;
};

export const getWeeksForMonthView = (startsAt) => {
  return arrayRotate(
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    startsAt
  );
};

function arrayRotate(arr, count) {
  const len = arr.length;
  arr.push(...arr.splice(0, ((count % len) + len) % len));
  return arr;
}
