import type Call from "./Call";

type Action = {
  type: "call/load";
  payload: Call[];
};

export default Action;
