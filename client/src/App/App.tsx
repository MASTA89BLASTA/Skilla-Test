import React from "react";
import CallsTable from "../features/components/calls/CallsTable";
// import CallTest from "../features/components/calls/CallTest";
import "./App.scss";

function App(): JSX.Element {
  return (
    <div className="App_wrapper">
      <CallsTable />
    </div>
  );
}

export default App;
