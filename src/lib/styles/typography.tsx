import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

export const interFont = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});
export const iosevkaFont = localFont({
	variable: "--font-iosevka",
	src: [
		{
			path: "../../public/fonts/iosevka/iosevka-das-version-regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/iosevka/iosevka-das-version-italic.woff2",
			weight: "400",
			style: "italic",
		},
	],
});
export const madeMellowFont = localFont({
	variable: "--font-made-mellow",
	src: [
		{
			path: "../../public/fonts/made-mellow/MADE-Mellow-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/made-mellow/MADE-Mellow-Light.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../../public/fonts/made-mellow/MADE-Mellow-Bold.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/made-mellow/MADE-Mellow-Black.otf",
			weight: "400",
			style: "italic",
		},
	],
});
