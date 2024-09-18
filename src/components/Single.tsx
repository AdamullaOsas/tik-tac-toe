import React, { useState } from "react";
import logo from "../assets/logo.svg"; // Logo SVG
import iks from "../assets/icon-x.svg"; // Icon X SVG
import ou from "../assets/icon-o.svg"; // Icon O SVG
import reset from "../assets/icon-restart.svg"; // Reset SVG

const Single = () => {
    const [tiles, setTiles] = useState<Array<any>>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    // Function to calculate the winner
    const calculateWinner = (tiles: Array<any>) => {
        const lines = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                return tiles[a]; // Return 'X' or 'O' if there's a winner
            }
        }
        return null; // Return null if there's no winner
    };

    const handleTileClick = (index: number) => {
        // If there's a winner or the tile is already filled, ignore the click
        if (winner || tiles[index]) return;

        const newTiles = [...tiles];
        newTiles[index] = isXNext ? (
            <img src={iks} alt="" />
        ) : (
            <img src={ou} alt="" />
        );
        setTiles(newTiles);
        const newWinner = calculateWinner(newTiles);
        setWinner(newWinner);
        setIsXNext(!isXNext);
    };

    return (
        <div className="w-full min-h-screen bg-darkNavy flex items-center justify-center">
            <section className="w-[328px] flex flex-col">
                <div className="flex w-full justify-between items-center mb-4">
                    <img src={logo} alt="logo" className="h-8" />
                    <div className="flex items-center">
                        <img
                            src={isXNext ? iks : ou}
                            alt="current turn"
                            className="h-6 mr-2"
                        />
                        <p className="text-white font-bold">
                            {winner
                                ? `WINNER: ${winner}`
                                : isXNext
                                ? "TURN"
                                : "TURN"}
                        </p>
                    </div>
                    <img
                        src={reset}
                        alt="reset game"
                        className="h-6 cursor-pointer"
                    />
                </div>

                <div className="grid grid-cols-3 gap-[20px]">
                    {tiles.map((tile, index) => (
                        <button
                            key={index}
                            className="w-[96px] h-[96px] bg-navy shadow-[inset_0_-8px_0_#10212A] rounded-[10px] flex items-center justify-center text-2xl font-bold text-white"
                            onClick={() => handleTileClick(index)}
                        >
                            {tile}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Single;
