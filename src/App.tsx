import { useState } from "react";

import "./App.css";
import Quote from "./components/Quote";

function App() {
  return (
    <>
      <div className="bg-green-400  h-screen justify-center items-center flex flex-col">
        <Quote />
      </div>
    </>
  );
}

export default App;
