import React, { useState, useEffect } from "react";
const Logic = () => {
  // const audioflipp = new Audio("/Sound/Whip-SoundBible.com-1988767601.mp3");
  // // const audiomatch = new Audio("/Sound/match.WAV");
  // const audiogameover = new Audio("/Sound/gameover.mp3");
  const difficultyLevels = {
    easy: {
      rows: 2,
      cols: 4,
      symbols: ["🍎", "🍊", "🍋", "🍉"],
      RemainHints: 1,
    },

    medium: {
      rows: 3,
      cols: 4,
      symbols: ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓"],
      RemainHints: 2,
    },
    hard: {
      rows: 4,
      cols: 4,
      symbols: ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🥑", "🍒"],
      RemainHints: 3,
    },
  };
  const [click, setclick] = useState(false);
  const [ishover, setishover] = useState(false);
  const [open, setopen] = useState(false);
  const [cards, setcards] = useState([]);
  const [flipp, setflipp] = useState([]);
  const [solved, setsolved] = useState([]);
  const [hints, sethints] = useState(false);
  const [RemainHints, setRemainHints] = useState(0);
  const [dificulty, setdificulty] = useState("easy");
  const [score, setscore] = useState(0);
  const [time, settime] = useState(0);
  const [moves, setmoves] = useState(0);
  const [disabled, setdisabled] = useState(false);
  const [hintsset, sethintsset] = useState([]);
  const [highscore, sethighscore] = useState(
    JSON.parse(localStorage.getItem("high")) || {}
  );
  const [isplaying, setisplaying] = useState(false);
  const handleplaying = () => {
    setisplaying((prevstate) => !prevstate);
  };
  useEffect(() => {
    localStorage.setItem("high", JSON.stringify(highscore));
  }, [highscore]);
  const generate = () => {
    const { rows, cols, symbols, RemainHints } = difficultyLevels[dificulty];
    const duplicates = symbols.concat(symbols);
    const shuffles = duplicates.sort(() => Math.random() - 0.5);
    const newcard = [];
    for (let i = 0; i < rows * cols; i++) {
      newcard.push({ id: i, symbol: shuffles[i] });
    }
    setcards(newcard);
    sethints(false);
    setRemainHints(RemainHints);
  };
  useEffect(() => {
    generate();
  }, [dificulty]);

  const HandleHint = () => {
    if (!disabled && !hints) {
      // Revealing a portion of the cards (e.g., first 4 cards)
      if (RemainHints > 0) {
        const all = Array.from({ length: cards.length }, (_, i) => i);
        const prev = hintsset.flat();
        const remain = all.filter((index) => !prev.includes(index));
        const hintIndices = remain.slice(0, 2);
        setflipp(hintIndices);
        sethintsset([...hintsset, hintIndices]);
        setRemainHints(RemainHints - 1);
      } else {
        sethints(true);
      }
      setTimeout(() => {
        setflipp([]);
      }, 2000); // Hide the revealed cards after 2 seconds
    }
    console.log("hint is", hints);
  };
  useEffect(() => {
    if (flipp.length === 2) {
      checkformatch();
    }
  }, [flipp, cards]);
  useEffect(() => {
    if (
      solved.length > 0 &&
      cards.length > 0 &&
      solved.length === cards.length
    ) {
      endgame();
    }
  }, [solved, cards]);

  const flippcard = (index) => {
    setclick(true);
    if (!disabled && !solved.includes(index) && flipp.length < 2 && isplaying) {
      setflipp([...flipp, index]);
      // document.getElementById('flip-audio').play();
      // audioflipp.play();
      setmoves((prev) => prev + 1);
    }
  };
  const checkformatch = () => {
    const [first, second] = flipp;
    if (cards[first].symbol !== cards[second].symbol) {
      setTimeout(() => {
        setflipp([]);
      }, 500);
    } else {
      setsolved([...solved, first, second]);
      // audiomatch.play()
      setscore(score + 1);
      setflipp([]);
    }
    setdisabled(true);
    setTimeout(() => {
      setdisabled(false);
    }, 1000);
  };

  const endgame = () => {
    const exist = highscore[dificulty];
    if (
      !exist ||
      score > exist.score ||
      time < exist.time ||
      moves < exist.moves
    ) {
      sethighscore({ ...highscore, [dificulty]: { score, time, moves } });
    }
    // audiogameover.play();

    reset();
  };
  const reset = () => {
    setcards([]);
    setflipp([]);
    setsolved([]);
    setscore(0);
    settime(0);
    setmoves(0);
    setdisabled(false);
    setisplaying(false);
    generate();
  };

  console.log("high scores is ", highscore);

  useEffect(() => {
    let timer;
    if (isplaying ) {
       timer = setTimeout(() => {
        if (!click) return;
        else {
          settime((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time, click, isplaying]);

  return {
    handleplaying,
    isplaying,
    HandleHint,
    hints,
    open,
    ishover,
    setishover,
    setopen,
    setdificulty,
    highscore,
    difficultyLevels,
    score,
    moves,
    time,
    dificulty,
    solved,
    flipp,
    click,
    cards,
    flippcard,
    RemainHints,
  };
};
export default Logic;
