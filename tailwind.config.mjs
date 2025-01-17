import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			keyframes: {
				shine: {
					"0%": { "background-position": "100%" },
					"100%": { "background-position": "-100%" },
				}
			},
			animation: {
				shine: "shine 5s linear infinite",
			},
			fontFamily: {
				mono: ['Major Mono Display', ...defaultTheme.fontFamily.mono],
				display: ['Bungee Shade', ...defaultTheme.fontFamily.serif],
			},
			colors: {
				verdeFuerte: "#009241",
				fondoBlanco: "#EEEFF0"
			}
		}
	},
	plugins: [],
}
