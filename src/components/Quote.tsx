import { useState, useEffect, useCallback } from "react";
import { FaQuoteLeft, FaSquareTumblr } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";

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

interface QuoteProps {
  getRandomColor: () => string;
  Randomcolor: string;
}

export default function Quote({ Randomcolor, getRandomColor }: QuoteProps) {
  const [data, setData] = useState<Quote>();
  const [color, setColor] = useState(Randomcolor);

  console.log(color);

  const handleChangeColor = useCallback(() => {
    const randomColor = getRandomColor();
    setColor(randomColor);
  }, [getRandomColor]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const jsonData = await response.json();
      setData(jsonData);
      handleChangeColor();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [handleChangeColor]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentQuote = data?.content;

  const currentAuthor = data?.author;

  // share twitter post

  const twitterLink =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);

  const tumblrLink =
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
    encodeURIComponent(currentAuthor ? currentAuthor : "") +
    "&content=" +
    encodeURIComponent(currentQuote ? currentQuote : "") +
    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
  return (
    <>
      <div
        id="container"
        className="flex flex-col bg-white space-y-5 w-[500px] mx-auto my-auto p-4 rounded-[10px] items-center justify-center"
      >
        <div id="quote-container" className="flex flex-col w-full space-y-5">
          <h1
            style={{ color: color }}
            className=" text-wrap mx-[15px] font-bold flex text-[28px]"
          >
            <span className="mr-1 text-[28px]">
              <FaQuoteLeft />
            </span>
            {currentQuote}
          </h1>

          <h2
            style={{ color: color }}
            className="text-right mr-[30px] text-[16px]"
          >
            - {currentAuthor}
          </h2>
        </div>

        <div id="button" className="flex justify-around w-full">
          <div
            id="social"
            style={{ color: color }}
            className="flex justify-start items-center w-1/2 text-[13.6px]"
          >
            <span className="text-[40px]">
              <a href={tumblrLink}>
                {" "}
                <FaSquareTumblr />
              </a>
            </span>

            <span className="text-[40px]">
              <a href={twitterLink}>
                {" "}
                <FaTwitterSquare />
              </a>
            </span>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={fetchData}
              style={{ backgroundColor: color }}
              className=" items-center  px-[18px] py-[8px] text-[13.6px]  text-white rounded"
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
