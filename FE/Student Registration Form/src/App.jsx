/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import CreateStudent from "./CreateStudent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreateStudent />
    </>
  );
}

export default App;
