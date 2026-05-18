import dayjs from "dayjs";

export function getCalendarDays(month: number, year: number) {
  // Start of the visible month
  const startOfMonth = dayjs().year(year).month(month).startOf("month");

  // To fill the first row, we find the "Monday" of the week the month starts in
  // .day(1) assumes Monday is the start of your week
  const startOfGrid = startOfMonth.day(1);

  const days = [];
  let day = startOfGrid;

  // We generate 42 days (6 rows x 7 columns)
  for (let i = 0; i < 42; i++) {
    days.push({
      date: day.format("YYYY-MM-DD"),
      dayNumber: day.date(),
      isCurrentMonth: day.month() === month,
      fullDate: day,
    });
    day = day.add(1, "day");
  }
  return days;
}
