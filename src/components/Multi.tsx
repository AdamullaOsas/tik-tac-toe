import React, { useState } from "react";
import logo from "../assets/logo.svg";
import iks from "../assets/icon-x.svg";
import ou from "../assets/icon-o.svg";
import reset from "../assets/icon-restart.svg";
import { useNavigate } from "react-router-dom";

const Multi = () => {
    const [tiles, setTiles] = useState<Array<string | null>>(
        Array(9).fill(null)
    );
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const navigate = useNavigate();

    const [winsX, setWinsX] = useState(0);
    const [ties, setTies] = useState(0);
    const [winsO, setWinsO] = useState(0);

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
                    return "X";
                } else {
                    setWinsO((prev: number) => prev + 1);
                    return "O";
                }
            }
        }

        if (tiles.every((tile) => tile !== null)) {
            setTies((prev: number) => prev + 1);
            return "Tie";
        }

        return null;
    };

    const handleTileClick = (index: number) => {
        if (winner || tiles[index]) return;

        const newTiles = [...tiles];
        newTiles[index] = isXNext ? "X" : "O";
        setTiles(newTiles);

        const newWinner = calculateWinner(newTiles);
        setWinner(newWinner);
        setIsXNext(!isXNext);
    };

    const handleReset = () => {
        setTiles(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinsX(0);
        setTies(0);
        setWinsO(0);
    };

    const nextRound = () => {
        setTiles(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className="w-full min-h-screen bg-darkNavy flex items-center justify-center">
            <section className="w-[328px] flex flex-col">
                <div className="flex w-full justify-between items-center mb-16">
                    <img src={logo} alt="logo" className="h-8" />
                    <div className="flex items-center h-10 bg-navy w-24 justify-center rounded-[5px] shadow-[inset_0_-4px_0_#10212A] pb-1">
                        <img
                            src={isXNext ? iks : ou}
                            alt="current turn"
                            className="size-4 mr-2"
                        />
                        <p className="text-silver font-bold">TURN</p>
                    </div>

                    <button className="bg-silver size-10 rounded-[5px] flex items-center justify-center shadow-[inset_0_-4px_0_#6B8997]">
                        <img
                            src={reset}
                            alt="reset game"
                            className="h-4 cursor-pointer"
                            onClick={handleReset}
                        />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-[20px] mb-5">
                    {tiles.map((tile, index) => (
                        <button
                            key={index}
                            className="w-[96px] h-[96px] bg-navy shadow-[inset_0_-8px_0_#10212A] rounded-[10px] flex items-center justify-center text-2xl font-bold text-white"
                            onClick={() => handleTileClick(index)}
                        >
                            {tile === "X" && (
                                <img
                                    src={iks}
                                    alt="X"
                                    className="size-10 mb-1"
                                />
                            )}{" "}
                            {tile === "O" && (
                                <img
                                    src={ou}
                                    alt="O"
                                    className="size-10 mb-1"
                                />
                            )}{" "}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-5 h-[64px]">
                    <div className="flex items-center justify-center flex-col w-full max-w-24 bg-blue rounded-[10px] h-full">
                        <p className="little text-darkNavy">X (P1)</p>
                        <h1 className="headingS text-darkNavy">{winsX}</h1>
                    </div>
                    <div className="flex items-center justify-center flex-col w-full max-w-24 bg-silver rounded-[10px] h-full">
                        <p className="little text-darkNavy">TIES</p>
                        <h1 className="headingS text-darkNavy">{ties}</h1>
                    </div>
                    <div className="flex items-center justify-center flex-col w-full max-w-24 bg-orange rounded-[10px] h-full">
                        <p className="little text-darkNavy">O (P2)</p>
                        <h1 className="headingS text-darkNavy">{winsO}</h1>
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
