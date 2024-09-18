/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#31C3BD",
                lightBlue: "#65E9E4",
                orange: "#F2B137",
                lightOrange: "#FFC860",
                darkNavy: "#1A2A33",
                navy: "#1F3641",
                silver: "#A8BFC9",
                lightSilver: "#DBE8ED",
            },
        },
    },
    plugins: [],
};
