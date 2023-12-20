import { useState, useEffect } from "react";
import { FaQuoteLeft, FaSquareTumblr } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            <span className="mr-1 text-[28px]">
              <FaQuoteLeft />
            </span>
            {data?.content}
          </h1>

          <h2 className="text-right text-green-400 text-[16px]">
            - {data?.author}
          </h2>
        </div>

        <div id="button" className="flex justify-around w-full">
          <div
            id="social"
            className="flex justify-start items-center w-1/2 text-green-400 text-[13.6px]"
          >
            <span className="text-[40px]">
              <a href="#">
                {" "}
                <FaSquareTumblr />
              </a>
            </span>

            <span className="text-[40px]">
              <a href="#">
                {" "}
                <FaTwitterSquare />
              </a>
            </span>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={fetchData}
              className=" items-center  px-[18px] py-[8px] text-[13.6px] bg-green-400 text-white rounded"
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
