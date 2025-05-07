/* eslint-disable @typescript-eslint/default-param-last */
import type Action from "./types/Action";
import type State from "./types/State";

export const initState: State = {
    total_rows: 0,
    results: [],
};

function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case "call/load":
      return {
        ...state,
          total_rows: action.payload.total_rows,
          results: action.payload.results,
      };
    default:
      return state;
  }
}

export default reducer;
