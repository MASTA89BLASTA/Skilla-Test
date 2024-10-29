/* eslint-disable @typescript-eslint/default-param-last */
import type Action from "./types/Action";
import type State from "./types/State";

export const initState: State = {
  callsList: {
    results: [],
    total_rows: "0",
  },
};

function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case "call/load":
      return {
        ...state,
        callsList: {
          results: action.payload.results,
          total_rows: action.payload.total_rows,
        },
      };
    default:
      return state;
  }
}

export default reducer;
