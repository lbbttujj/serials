/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            maxHeight: {
                '128': '32rem',
                '4/5': '80vh',
            }
        },
    },
    plugins: [],
}