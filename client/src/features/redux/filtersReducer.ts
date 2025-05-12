type FiltersState = {
  inOut: 0 | 1 | ""; 
};

const initialState: FiltersState = {
  inOut: "",
};

export const setInOut = (value: 0 | 1 | ""): { type: "filters/setInOut"; payload: 0 | 1 | "" } => ({
  type: "filters/setInOut" as const,
  payload: value,
});

type Action = ReturnType<typeof setInOut>;

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function filtersReducer(state = initialState, action: Action): FiltersState {
  switch (action.type) {
    case "filters/setInOut":
      return { ...state, inOut: action.payload };
    default:
      return state;
  }
}

