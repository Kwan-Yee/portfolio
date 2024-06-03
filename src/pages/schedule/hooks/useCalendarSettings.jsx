import { useLocalStorage } from "./useLocalStorage";

export const useCalendarSettings = () => {
  const [calendarSettings, setCalendarSettings] = useLocalStorage(
    `calendar-preferences`,
    {
      startsAt: 0,
    }
  );

  return {
    calendarSettings,
    setCalendarSettings,
  };
};
