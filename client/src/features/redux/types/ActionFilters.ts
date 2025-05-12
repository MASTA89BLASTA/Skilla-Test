export const setInOut = (value: "" | 0 | 1): { type: "filters/setInOut"; payload: "" | 0 | 1 } => ({
  type: "filters/setInOut" as const,
  payload: value,
});

export type InOutFilters = ReturnType<typeof setInOut>;