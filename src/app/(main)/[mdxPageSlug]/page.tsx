import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SITE_OG_IMAGE, SITE_TITLE_APPEND, SITE_URL } from "@/config";
import { rootPages } from "@/generated";
import { LinkTo } from "@/lib/components/Anchor";
import { MDXContent } from "@/lib/components/MDX";
import { ViewsCounter } from "@/lib/components/ViewsCounter";
import { fetchRepoContributors } from "@/lib/domains/GitHub";

export const dynamicParams = false;

export function generateStaticParams() {
	return rootPages.flatMap(({ page_slug, skip_page }) => {
		if (skip_page) return [];

		return {
			mdxPageSlug: page_slug,
		};
	});
}

type PageParams = {
	params: Promise<{
		mdxPageSlug: string;
	}>;
};
export default async function MDXPageSlugPage(props: PageParams) {
	const params = await props.params;

	const { mdxPageSlug } = params;

	const post = rootPages.find((page) => page.page_slug === mdxPageSlug);

	if (!post) notFound();

	return (
		<>
			<h1 className="pb-20 pt-10 font-serif text-8xl font-bold tracking-tighter">
				/{post.page_slug}
			</h1>
			<MDXContent code={post.code} components={{ RepoContributors }} />
			<ViewsCounter slug={post.page_path} />
		</>
	);
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
	const params = await props.params;
	const post = rootPages.find((page) => page.page_slug === params.mdxPageSlug);

	return {
		title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
		description: post?.description,
		openGraph: {
			title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
			description: post?.description,
			type: "article",
			url: `${SITE_URL}/${params.mdxPageSlug}`,
			images: { url: SITE_OG_IMAGE },
		},
		twitter: {
			card: "summary_large_image",
			title: `${post?.seo_title ?? post?.title} ${SITE_TITLE_APPEND}`,
			description: post?.description,
			images: { url: SITE_OG_IMAGE },
		},
	};
}

const RepoContributors = async () => {
	const contributors = await fetchRepoContributors();

	return (
		<div className="flex flex-wrap gap-6 pt-4">
			{contributors?.map(
				({ login, avatar_url, html_url }) =>
					html_url && (
						<LinkTo href={html_url} key={login} target="_blank">
							<div className="flex flex-col items-center gap-1">
								{avatar_url ? (
									<span className="overflow-hidden rounded-global">
										<Image src={avatar_url} alt={login ?? ""} height={128} width={128} />
									</span>
								) : null}
								<p className="m-0 pb-2 text-sm">{login}</p>
							</div>
						</LinkTo>
					),
			)}
		</div>
	);
};
