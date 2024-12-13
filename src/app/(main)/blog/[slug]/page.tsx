import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Balancer } from "react-wrap-balancer";

import { SITE_OG_IMAGE, SITE_TITLE_APPEND, SITE_URL } from "@/config";
import { blogPosts } from "@/generated";
import { MDXContent } from "@/lib/components/MDX";
import { ReadingProgress } from "@/lib/components/ProgressBar.client";
import { InfoBlock } from "@/lib/components/sink";
import { Gradient } from "@/lib/components/Typography";
import { ChameleonHighlight, Sparkles } from "@/lib/components/Typography.client";
import { ViewsCounter } from "@/lib/components/ViewsCounter";

import {
	HighlightWithUseEffect,
	HighlightWithUseInterval,
} from "./chameleon-text/components.client";

export const dynamicParams = false;

export async function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.page_slug,
	}));
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
	const params = await props.params;
	const post = blogPosts.find((page) => page.page_slug === params.slug);

	return {
		title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
		description: post?.description,
		openGraph: {
			title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
			description: post?.description,
			type: "article",
			url: `${SITE_URL}/blog/${params.slug}`,
			images: { url: post?.image ?? SITE_OG_IMAGE },
		},
		twitter: {
			card: "summary_large_image",
			title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
			description: post?.description,
			images: { url: post?.image ?? SITE_OG_IMAGE },
		},
	};
}

type PageParams = {
	params: Promise<{
		slug: string;
	}>;
};
export default async function BlogPage(props: PageParams) {
	const params = await props.params;
	const post = blogPosts.find((page) => page.page_slug === params.slug);

	if (!post) notFound();

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{ __html: JSON.stringify(post.structured_data) }}
			/>
			<ReadingProgress />
			<h1 className="pb-20 pt-10 font-serif text-8xl font-bold tracking-tighter">
				<Balancer>
					<Gradient>{post.title}</Gradient>
				</Balancer>
			</h1>

			<MDXContent
				code={post.code}
				components={{
					ChameleonHighlight,
					Gradient,
					InfoBlock,
					Sparkles,

					// Post specific components
					HighlightWithUseEffect,
					HighlightWithUseInterval,
				}}
			/>

			<ViewsCounter slug={post.url ?? post.page_path} />
		</>
	);
}
