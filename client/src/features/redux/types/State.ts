import type Call from "./Call";

type CallsListState = {
  total_rows: string;
  results: Call[];
};

type State = {
  callsList: CallsListState; 
};

export default State;
