import React from "react";
import CallsTable from "../features/components/calls/CallsTable";
import "./App.scss";

function App(): JSX.Element {
  return (
    <div className="App_wrapper">
      <CallsTable />
    </div>
  );
}

export default App;
