/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#004A92",
                secondary: "#4ec2c9",
                tertiary: "#6b06f3"
            }
        }
    },
    plugins: []
};
