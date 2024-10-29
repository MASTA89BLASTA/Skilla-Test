import type Call from "./Call";

type CallsListState = {
  results: Call[];
  total_rows: string;
};

type State = {
  callsList: CallsListState; 
};

export default State;
