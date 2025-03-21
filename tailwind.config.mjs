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
				},
				"background-shine": {
					"from": { "backgroundPosition": "0 0" },
    				"to": { "backgroundPosition": "-200% 0" }
				}
			},
			animation: {
				shine: "shine 5s linear infinite",
				"background-shine": "background-shine 2s linear infinite"
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
	plugins: [
		require('@tailwindcss/typography')
	],
}
