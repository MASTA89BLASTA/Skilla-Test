import type Call from "../redux/types/Call";

// eslint-disable-next-line import/prefer-default-export
export function filterCalls(
  calls: Call[],
  dateStart: string | null,
  dateEnd: string | null,
  inOut: string | number | null
): Call[] {
  const start = dateStart ? new Date(dateStart) : null;
  const end = dateEnd ? new Date(dateEnd) : null;
  if (end) end.setHours(23, 59, 59, 999);

  return calls.filter(({ date, in_out }) => {
    const callDate = new Date(date);
    return (
      (!start || callDate >= start) &&
      (!end || callDate <= end) &&
      (inOut === "" || inOut === null || in_out === Number(inOut))
    );
  });
}