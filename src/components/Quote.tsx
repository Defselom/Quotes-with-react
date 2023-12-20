import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa6";

interface Quote {
  _id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  // The `slug` of the quote author
  authorSlug: string;
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  tags: string[];
}

export default function Quote() {
  const [data, setData] = useState<Quote>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        id="container"
        className="flex flex-col bg-white space-y-5 w-[500px] mx-auto my-auto p-4 rounded-[10px] items-center justify-center"
      >
        <div id="quote-container" className="flex flex-col w-full space-y-5">
          <h1 className="text-green-400 text-wrap font-bold flex text-[28px]">
            <span className="mr-1">
              <FaQuoteLeft />
            </span>
            {data?.content}
          </h1>

          <h2 className="text-right text-green-400 text-[16px]">
            - {data?.author}
          </h2>
        </div>
        <div id="button">
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 text-[13.6px] bg-green-400 text-white rounded"
          >
            new quote
          </button>
        </div>
      </div>
    </>
  );
}
