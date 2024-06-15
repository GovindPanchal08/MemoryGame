"use client";
import React, { useEffect, useState } from "react";
import Logic from "./Logic/Logic";
import { BsArrowBarRight } from "react-icons/bs";
import { BsArrowBarLeft } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Game = () => {
  useGSAP(() => {
    gsap.from(".levels", {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0,
    });
  });
  const [isclick, setisclick] = useState(false);
  const {
    isplaying,
    highscore,
    HandleHint,
    difficultyLevels,
    score,
    moves,
    time,
    solved,
    flipp,
    click,
    cards,
    flippcard,
    setdificulty,
    open,
    setopen,
    ishover,
    setishover,
    RemainHints,
    handleplaying,
  } = Logic();
  return (
    <div className=" flex   w-[100%] h-screen bg-gradient-to-r from-slate-100 to-teal-100">
      <div className="p-7 md:block hidden gap-2">
        <h1
          onMouseEnter={() => setishover(true)}
          onMouseLeave={() => setishover(false)}
          className="text-2xl text-center font-bold bg-black text-white p-2 rounded-lg cursor-pointer hover:"
        >
          High Score
        </h1>
        {Object.entries(highscore).map(
          ([difficulty, { score, time, moves }], ind) => (
            <div
              key={difficulty}
              className="flex flex-col mt-3 items-center justify-center"
            >
              {ishover && (
                <p className="flex flex-col text-lg font-medium gap-1 ">
                  <p className="text-lg font-bold">
                    {ind + 1} {difficulty.toUpperCase()}
                  </p>
                  <span className="bg-gray-700 flex  h-[0.3px] w-28 "></span>
                  <h1>Score- {score} </h1>
                  <h1>Time- {time} </h1>
                  <h1>Moves- {moves}</h1>
                </p>
              )}
            </div>
          )
        )}
        <div className="difficult mt-4  flex flex-col items-center justify-center  gap-3">
          <h1
            onClick={() => setopen(!open)}
            className="text-2xl font-bold bg-black text-white p-2 rounded-lg cursor-pointer"
          >
            Difficulty Level`&apos;`s
          </h1>
          {Object.keys(difficultyLevels).map((i) => (
            <div key={i} className="levels hover:scale-110">
              <button
                className={`${
                  open ? "block" : "hidden"
                }  text-xl font-semibold bg-`}
                key={i}
                onClick={() => setdificulty(i)}
              >
                {i}
              </button>
            </div>
          ))}
        </div>
        <div className="">
          <button
            onClick={() => HandleHint()}
            className="text-2xl mt-2 text-center font-semibold bg-black text-white p-2 rounded-md cursor-pointer"
          >
            Hint : {RemainHints} remaining
          </button>
        </div>
      </div>
      <div>
        <p className="block md:hidden absolute text-2xl font-medium ml-3 mt-2 ">
          {!isclick && (
            <BsArrowBarRight onClick={() => setisclick(true)} size={35} />
          )}
        </p>
        {isclick && (
          <div className="p-5 absolute z-[1]  bg-slate-400 h-full  flex flex-col ">
            <p className=" mb-5">
              <BsArrowBarLeft size={35} onClick={() => setisclick(false)} />
            </p>
            <h1
              onMouseEnter={() => setishover(true)}
              onMouseLeave={() => setishover(false)}
              className="text-xl text-center font-bold bg-black text-white p-2 rounded-lg cursor-pointer hover:"
            >
              High Score
            </h1>
            {Object.entries(highscore).map(
              ([difficulty, { score, time, moves }], ind) => (
                <div
                  key={difficulty}
                  className="flex flex-col mt-3 items-center justify-center"
                >
                  {ishover && (
                    <p className="flex flex-col text-lg font-medium gap-1 ">
                      <p className="text-lg font-bold">
                        {ind + 1} {difficulty.toUpperCase()}
                      </p>
                      <span className="bg-gray-700 flex  h-[0.3px] w-28 "></span>
                      <h1>Score- {score} </h1>
                      <h1>Time- {time} </h1>
                      <h1>Moves- {moves}</h1>
                    </p>
                  )}
                </div>
              )
            )}
            <div className="difficult mt-4  flex flex-col items-center justify-center  gap-3">
              <h1
                onClick={() => setopen(!open)}
                className="text-xl font-bold bg-black text-white p-2 rounded-lg cursor-pointer"
              >
                Difficulty Level`&apos;`s
              </h1>
              {Object.keys(difficultyLevels).map((i) => (
                <div key={i} className="levels hover:scale-110">
                  <button
                    className={`${
                      open ? "block" : "hidden"
                    }  text-xl font-semibold bg-`}
                    key={i}
                    onClick={() => setdificulty(i)}
                  >
                    {i}
                  </button>
                </div>
              ))}
            </div>
            <div className="">
              <button
                onClick={() => HandleHint()}
                className="text-xl  text-center font-semibold bg-black text-white p-2 rounded-md cursor-pointer"
              >
                Hint : {RemainHints} remaining
              </button>
            </div>
          </div>
        )}
      </div>
      {
        <div className="memory-game flex  flex-col items-center  w-[100%] md:w-[60%] ">
          <div className="game-info flex  bg-gradient-to-r from-fuchsia-400 to-yellow-200 bg-clip-text text-transparent text-2xl  font-bold  flex-row mt-10 md:mt-5 gap-4 ">
            <p className="flex gap-2">
              Score: <p className="text-black">{score}</p>
            </p>
            <p className="flex gap-2">
              Time: <p className="text-black">{time}</p>
            </p>
            <p className="flex gap-2">
              Moves: <p className="text-black">{moves}</p>
            </p>
          </div>

          <div className="cards-grid  mt-5 md:mt-10 grid gap-3 md:grid-cols-4 grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${
                  flipp.includes(index) || solved.includes(index)
                    ? "flipped"
                    : ""
                }`}
                onClick={() => flippcard(index)}
              >
                <div className="card-inner">
                  <div className="card-front"></div>
                  <div className="card-back">{card.symbol}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleplaying}
            className="bg-black text-white p-4 mt-10 w-40 text-2xl font-semibold rounded-lg "
          >
            {isplaying ? "Pause" : "Playing"}
          </button>
        </div>
      }
    </div>
  );
};

export default Game;
