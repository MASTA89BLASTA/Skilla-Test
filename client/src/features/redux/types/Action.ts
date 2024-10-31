import type Call from "./Call";

type Action = {
  type: "call/load";
  payload: {
    total_rows: string; 
    results: Call[]; 
  };
};

export default Action;
