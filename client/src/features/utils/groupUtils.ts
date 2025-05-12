// // import dayjs from "dayjs";
// // import type { Dayjs } from "dayjs";

// export default function getCallGroup(date: string, dateStart: string, dateEnd: string): string {
//   if (typeof date !== "string") throw new Error("Invalid date format");
//   const callDate: Dayjs = dayjs(date);
//   const start: Dayjs = dayjs(dateStart);
//   const end: Dayjs = dayjs(dateEnd);
//   const today: Dayjs = dayjs();
//   const yesterday: Dayjs = today.subtract(1, "day");

//   if (start.isSame(end, "day")) {
//     if (callDate.isSame(today, "day")) return "Сегодня";
//     if (callDate.isSame(yesterday, "day")) return "Вчера";
//   }

//   if (end.diff(start, "day") <= 7) {
//     if (callDate.isSame(today, "week")) return "Текущая неделя";
//     return "Прошлая неделя";
//   }

//   if (end.diff(start, "day") > 7) {
//     if (callDate.isSame(today, "month")) return "Этот месяц";
//     return "Прошлый месяц";
//   }

//   return "";
// }