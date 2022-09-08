import Image, { ImageProps } from "next/future/image";
import styled from "styled-components";

import { ViewsCounter } from "@/components/ViewsCounter";
import { DocumentHead } from "@/components/shared/seo";
import ImageCSS from "@/public/karma/css.webp";
import ImageGo from "@/public/karma/go.webp";
import ImagePhoenix from "@/public/karma/phoenix.webp";
import ImagePython from "@/public/karma/python.webp";
import ImageReact from "@/public/karma/react.webp";
import ImageRust from "@/public/karma/rust.webp";
import ImageSvelte from "@/public/karma/svelte.webp";
import ImageTypeScript from "@/public/karma/typescript.webp";
import ImageVue from "@/public/karma/vue.webp";
import { FullWidthWrapper, Space } from "@/styles/layouts";
import { LinkTo, ReallyBigTitle, Title } from "@/styles/typography";

const KARMA_COLOR_PALETTE = [
	"#FC618D",
	"#51C7DA",
	"#AF98E6",
	"#E3CF65",
	"#7BD88F",
	"#FD9353",
] as const;
type TKarmaColors = typeof KARMA_COLOR_PALETTE[number];

const data = [
	{
		name: "React",
		image: ImageReact,
	},
	{
		name: "CSS",
		image: ImageCSS,
	},
	{
		name: "Go",
		image: ImageGo,
	},
	{
		name: "Phoenix",
		image: ImagePhoenix,
	},
	{
		name: "Python",
		image: ImagePython,
	},
	{
		name: "Rust",
		image: ImageRust,
	},
	{
		name: "Svelte",
		image: ImageSvelte,
	},
	{
		name: "TypeScript",
		image: ImageTypeScript,
	},
	{
		name: "Vue",
		image: ImageVue,
	},
];

const Index = () => (
	<>
		<DocumentHead
			title="Karma"
			imageURL="/karma/karma-card.jpg"
			description="A colorful VS Code theme by Sreetam Das"
		/>
		<Space />
		<ReallyBigTitle>Karma —</ReallyBigTitle>
		<Title $size={4}>a VS Code theme</Title>
		<ColorPaletteWrapper>
			{KARMA_COLOR_PALETTE.map((color) => (
				<ColorPaletteBlock $color={color} key={color}>
					{color}
				</ColorPaletteBlock>
			))}
		</ColorPaletteWrapper>
		<LinksContainer>
			<LinkTo href="https://marketplace.visualstudio.com/items?itemName=SreetamD.karma">
				Install from VS Code marketplace
			</LinkTo>

			<LinkTo href="https://github.com/sreetamdas/karma">View source</LinkTo>
		</LinksContainer>
		<Space />
		<WideImagesContainer>
			{data.map(({ name, image }) => (
				<>
					<Title $size={2.5} as="h2" id={name.toLowerCase()}>
						{name}
					</Title>
					<StyledImage src={image} alt={`Karma theme screenshot for ${name}`} />
				</>
			))}
		</WideImagesContainer>

		<ViewsCounter />
	</>
);

export default Index;

const FullScreenImage = styled.div`
	margin-top: -1.5rem;
	justify-self: center;
	border-radius: var(--border-radius);

	&,
	> img {
		max-width: 95vw;
		width: 100%;
		height: auto;
	}
`;

const StyledImage = (props: ImageProps) => (
	<FullScreenImage>
		<Image {...props} quality={100} placeholder={"blur"} unoptimized />
	</FullScreenImage>
);

const WideImagesContainer = styled(FullWidthWrapper)`
	display: grid;
	justify-items: center;
`;

const ColorPaletteWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

const ColorPaletteBlock = styled.div<{ $color: TKarmaColors }>`
	display: grid;
	place-content: center;

	color: #000;
	background-color: ${({ $color }) => $color};

	font-family: var(--font-family-code);

	height: 7rem;
	width: 5rem;
	border-radius: var(--border-radius);
`;

const LinksContainer = styled.div`
	display: grid;
	gap: 5rem;
	justify-content: center;
	grid-auto-flow: column;
	padding: 40px 0;
`;

/**
 * many thanks to @NikkitaFTW and @_philpl for https://prism.dotenv.dev !
 */
export const KARMA_PRISM_THEME = {
	plain: {
		color: "#f7f1ff",
		backgroundColor: "#0a0e14",
	},
	styles: [
		{
			types: ["comment"],
			style: {
				color: "#696969",
				fontStyle: "italic" as const,
			},
		},
		{
			types: ["constant", "number", "builtin", "char"],
			style: {
				color: "#AF98E6",
			},
		},
		{
			types: ["symbol"],
			style: {
				color: "#FD9353",
			},
		},
		{
			types: ["class-name"],
			style: {
				color: "#51C7DA",
			},
		},
		{
			types: ["function", "inserted"],
			style: {
				color: "#7BD88F",
			},
		},
		{
			types: ["tag", "keyword", "operator", "deleted", "changed"],
			style: {
				color: "#FC618D",
			},
		},
		{
			types: ["attr-name"],
			style: {
				color: "#51C7DA",
				fontStyle: "italic" as const,
			},
		},
		{
			types: ["punctuation"],
			style: {
				color: "#88898F",
			},
		},
		{
			types: ["string"],
			style: {
				color: "#E3CF65",
			},
		},
		{
			types: ["property"],
			style: {
				color: "#D7D7D7",
			},
		},
		{
			types: ["variable"],
			style: {
				color: "#FD9353",
				fontStyle: "italic" as const,
			},
		},
	],
};
