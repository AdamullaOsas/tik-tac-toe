import React, { useState } from "react";
import logo from "../assets/logo.svg";
import iks from "../assets/icon-x.svg";
import ou from "../assets/icon-o.svg";
import reset from "../assets/icon-restart.svg";
import { useNavigate } from "react-router-dom";

const Multi = () => {
    const navigate = useNavigate();
    const [tiles, setTiles] = useState<Array<string | null>>(
        Array(9).fill(null)
    );
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    const [winsX, setWinsX] = useState(0);
    const [ties, setTies] = useState(0);
    const [winsO, setWinsO] = useState(0);

    const [winningTiles, setWinningTiles] = useState<number[]>([]);

    const [isReset, setIsReset] = useState(false);

    const calculateWinner = (tiles: Array<string | null>) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                if (tiles[a] === "X") {
                    setWinsX((prev: number) => prev + 1);
                    return { winner: "X", winningTiles: [a, b, c] };
                } else {
                    setWinsO((prev: number) => prev + 1);
                    return { winner: "O", winningTiles: [a, b, c] };
                }
            }
        }

        if (tiles.every((tile) => tile !== null)) {
            setTies((prev: number) => prev + 1);
            return { winner: "Tie", winningTiles: [] };
        }

        return { winner: null, winningTiles: [] };
    };

    const handleTileClick = (index: number) => {
        if (winner || tiles[index]) return;

        const newTiles = [...tiles];
        newTiles[index] = isXNext ? "X" : "O";
        setTiles(newTiles);

        const { winner: newWinner, winningTiles: newWinningTiles } =
            calculateWinner(newTiles);
        setWinner(newWinner);
        setWinningTiles(newWinningTiles);
        setIsXNext(!isXNext);
    };

    const handleReset = () => {
        setTiles(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsReset(false);
        setWinsX(0);
        setTies(0);
        setWinsO(0);
    };

    const nextRound = () => {
        setTiles(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningTiles([]);
    };

    return (
        <div className="w-full min-h-screen bg-darkNavy flex items-center justify-center">
            <section className="w-[328px] sm:w-[460px] flex flex-col">
                <div className="flex w-full justify-between items-center mb-16 sm:mb-5">
                    <img src={logo} alt="logo" className="h-8" />
                    <div className="flex items-center h-10 sm:h-[52px] sm:w-[140px] bg-navy w-24 justify-center rounded-[5px] shadow-[inset_0_-4px_0_#10212A] pb-1">
                        <img
                            src={isXNext ? iks : ou}
                            alt="current turn"
                            className="size-4 mr-2"
                        />
                        <p className="text-silver font-bold">TURN</p>
                    </div>

                    <button className="bg-silver size-10 sm:size-[52px] rounded-[5px] flex items-center justify-center shadow-[inset_0_-4px_0_#6B8997]">
                        <img
                            src={reset}
                            alt="reset game"
                            className="h-4 sm:h-5 cursor-pointer"
                            onClick={() => setIsReset(true)}
                        />

                        {isReset && (
                            <div className="absolute top-0 left-0 min-h-screen w-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="w-full h-[228px] bg-navy flex items-center justify-center">
                                    <div className="max-w-[280px] flex flex-col items-center justify-center">
                                        <h1 className="headingM text-silver">
                                            RESTART GAME?
                                        </h1>
                                        <div className="flex gap-4 mt-6">
                                            <button
                                                className="w-[139px] h-[52px] pb-1 bg-silver rounded-[10px] headingXS text-darkNavy shadow-[inset_0_-4px_0_#6B8997]"
                                                onClick={() =>
                                                    setIsReset(false)
                                                }
                                            >
                                                NO, CANCEL
                                            </button>
                                            <button
                                                className="w-[151px] h-[52px] pb-1 bg-orange rounded-[10px] headingXS text-darkNavy shadow-[inset_0_-4px_0_#CC8B13]"
                                                onClick={handleReset}
                                            >
                                                YES, RESTART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-5 mb-5">
                    {tiles.map((tile, index) => (
                        <button
                            key={index}
                            className={`w-[96px] h-[96px] sm:size-[140px] rounded-[10px] flex items-center justify-center text-2xl font-bold text-white
                ${
                    winningTiles.includes(index)
                        ? winner === "X"
                            ? "bg-blue"
                            : "bg-orange"
                        : "bg-navy"
                } shadow-[inset_0_-8px_0_#10212A]`}
                            onClick={() => handleTileClick(index)}
                        >
                            {tile === "X" && (
                                <img
                                    src={iks}
                                    alt="X"
                                    className="size-10 mb-1 sm:size-16"
                                    style={
                                        winningTiles.includes(index)
                                            ? {
                                                  filter: "brightness(0) saturate(100%) invert(9%) sepia(11%) saturate(2809%) hue-rotate(158deg) brightness(97%) contrast(85%)",
                                              }
                                            : undefined
                                    }
                                />
                            )}
                            {tile === "O" && (
                                <img
                                    src={ou}
                                    alt="O"
                                    className="size-10 mb-1 sm:size-16"
                                    style={
                                        winningTiles.includes(index)
                                            ? {
                                                  filter: "brightness(0) saturate(100%) invert(9%) sepia(11%) saturate(2809%) hue-rotate(158deg) brightness(97%) contrast(85%)",
                                              }
                                            : undefined
                                    }
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-5 h-[64px] sm:h-[72px]">
                    <div className="flex items-center justify-center flex-col w-full max-w-24 sm:max-w-[140px] bg-blue rounded-[10px] h-full">
                        <p className="little text-darkNavy sm:text-[14px]">
                            X (P1)
                        </p>
                        <h1 className="headingS text-darkNavy sm:text-[24px]">
                            {winsX}
                        </h1>
                    </div>
                    <div className="flex items-center justify-center flex-col w-full max-w-24 sm:max-w-[140px] bg-silver rounded-[10px] h-full">
                        <p className="little text-darkNavy sm:text-[14px]">
                            TIES
                        </p>
                        <h1 className="headingS text-darkNavy sm:text-[24px]">
                            {ties}
                        </h1>
                    </div>
                    <div className="flex items-center justify-center flex-col w-full max-w-24 sm:max-w-[140px] bg-orange rounded-[10px] h-full">
                        <p className="little text-darkNavy sm:text-[14px]">
                            O (P2)
                        </p>
                        <h1 className="headingS text-darkNavy sm:text-[24px]">
                            {winsO}
                        </h1>
                    </div>
                </div>
            </section>

            {winner && (
                <div className="absolute top-0 left-0 min-h-screen w-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-full h-[228px] bg-navy flex items-center justify-center">
                        <div className="max-w-[280px] flex flex-col items-center justify-center">
                            {winner === "Tie" ? (
                                <h1 className="headingM text-silver mb-4">
                                    ROUND TIED
                                </h1>
                            ) : (
                                <h1 className="body text-silver mb-4">
                                    {winner === "X" ? "Player 1" : "Player 2"}{" "}
                                    Wins!
                                </h1>
                            )}

                            {winner !== "Tie" ? (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={winner === "X" ? iks : ou}
                                        alt={winner}
                                        className="size-[30px] self-center"
                                    />
                                    <p
                                        className={`headingM ${
                                            winner === "X"
                                                ? "text-blue"
                                                : "text-orange"
                                        }`}
                                    >
                                        TAKES THE ROUND
                                    </p>
                                </div>
                            ) : null}

                            <div className="flex gap-4 mt-6">
                                <button
                                    className="w-[76px] h-[52px] pb-1 bg-silver rounded-[10px] headingXS text-darkNavy shadow-[inset_0_-4px_0_#6B8997]"
                                    onClick={() => navigate("/")}
                                >
                                    QUIT
                                </button>
                                <button
                                    className="w-[146px] h-[52px] pb-1 bg-orange rounded-[10px] headingXS text-darkNavy shadow-[inset_0_-4px_0_#CC8B13]"
                                    onClick={nextRound}
                                >
                                    NEXT ROUND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Multi;
