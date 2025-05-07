import type Call from "./Call";

type Action = {
  type: "call/load";
  payload: {
    total_rows: number;
    results: Call[];
  };
};

export default Action;
