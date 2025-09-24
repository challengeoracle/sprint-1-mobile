/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                medix: {
                    50: "#f0fdfd", // fundo claro (IndexScreen)
                    100: "#e6fefc", // fundo alternativo (HomeScreen)
                    200: "#e0f7f7", // input background
                    300: "#b2dfdb", // input border
                    400: "#7fbfbf", // placeholder
                    500: "#48c9b0", // botão secundário
                    600: "#2a9d8f", // verde principal
                    700: "#264653", // texto escuro
                    800: "#6c757d", // texto secundário
                    900: "#5c5c5c", // subtítulo
                    error: "#e63946", // cor de erro
                },
            },
        },
    },
    plugins: [],
};
