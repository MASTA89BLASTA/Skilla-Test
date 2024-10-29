import type Call from "./Call";

type Action = {
  type: "call/load";
  payload: {
    results: Call[];
    total_rows: string; 
  };
};

export default Action;
