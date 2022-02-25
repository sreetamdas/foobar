import { useRouter } from "next/router";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";

import { PostDetails } from "@/typings/blog";
import { getViewCount, updateAndGetViewCount } from "@/utils/misc";

const ViewsWrapper = styled.div<{ $hidden: TViewsCounterProps["hidden"] }>`
	display: flex;
	flex-direction: row;
	gap: 0.4rem;
	align-items: center;
	justify-content: center;
	margin: 20px auto 0;

	width: fit-content;
	padding: 5px 20px;

	& > p {
		margin: 0;
		font-size: 0.7rem;
	}

	${({ $hidden }) =>
		$hidden &&
		css`
			display: none;
		`}
`;

const ViewCount = styled.span`
	font-size: 1rem;
	padding: 5px;
	font-family: var(--font-family-code);
	color: var(--color-primary-accent);
	border-radius: var(--border-radius);
	background-color: var(--color-background);
	border: 2px solid var(--color-primary-accent);
`;

function getViewCountCopy(view_count: number, pageType: TViewsCounterProps["pageType"]) {
	switch (view_count) {
		case 0:
			return "No views yet. Wait what, HOW? 🤔";
		case 1:
			return "This page has been viewed only once. That's a lot of views!";
		case 69:
			return (
				<>
					This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount>{" "}
					times. Nice.
				</>
			);
		case 420:
			return (
				<>
					This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount>{" "}
					times. Hehe.
				</>
			);

		default: {
			if (view_count > 100) {
				return (
					<>
						This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount>{" "}
						times. Wow.
					</>
				);
			} else if (view_count > 1000) {
				return (
					<>
						This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount>{" "}
						times. Holy crap. 🤯
					</>
				);
			} else if (view_count > 10000) {
				return (
					<>
						This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount>{" "}
						times. Holy crap.
					</>
				);
			}
			return (
				<>
					This {pageType} has been viewed <ViewCount>{view_count.toLocaleString()}</ViewCount> times
				</>
			);
		}
	}
}

type TViewsCounterProps = {
	pageType?: "post" | "page";
	hidden?: boolean;
	disabled?: boolean;
};

export const ViewsCounter = ({
	pageType = "page",
	// Keep track of page views, but we don't display it
	hidden = false,
	// Essentially unmount the component, e.g. during development
	disabled = process.env.NODE_ENV === "development",
}: TViewsCounterProps) => {
	const { asPath: path } = useRouter();

	const { data } = useQuery<Pick<PostDetails, "view_count">>(
		["page-details", "view", path.split(/[?#]/)[0]],
		async () =>
			await (disabled
				? getViewCount(path.split(/[?#]/)[0])
				: updateAndGetViewCount(path.split(/[?#]/)[0])),
		{
			staleTime: Infinity,
		}
	);

	return (
		<ViewsWrapper $hidden={hidden}>
			<span role="img" aria-label="eyes">
				👀
			</span>
			<p>{getViewCountCopy(data?.view_count ?? 0, pageType)}</p>
		</ViewsWrapper>
	);
};
