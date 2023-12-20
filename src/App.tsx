import { useEffect, useState } from "react";

import "./App.css";
import Quote from "./components/Quote";

function App() {
  const [color, setcolor] = useState("");

  function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    // Retourne la couleur sous la forme #RRGGBB
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    if (color === "#ffffff") {
      return getRandomColor();
    }
    
    setcolor(color);
    return color;
  }

  useEffect(() => {
    const Randomcolor = getRandomColor();
    console.log(Randomcolor);
    return;
  }, []);

  return (
    <>
      <div
        style={{ backgroundColor: color }}
        className=" relative h-screen justify-center items-center flex flex-col"
      >
        <div className="relative">
          <Quote Randomcolor={color} getRandomColor={getRandomColor} />
        </div>
        <div className="mt-[15px] text-[16px] text-white">
          by Defselom with ❤️
        </div>
      </div>
    </>
  );
}

export default App;
