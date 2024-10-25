/* eslint-disable @typescript-eslint/default-param-last */
import type Action from "./types/Action";
import type State from "./types/State";

export const initState: State = {
  callsList: [],
};

function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case "call/load":
      return {
        ...state,
        callsList: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
