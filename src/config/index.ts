export const OWNER_NAME = "Sreetam Das";
export const DEFAULT_REPO = {
	owner: "sreetamdas",
	repo: "sreetamdas.com",
};

export const SITE_URL = process.env.SITE_URL as string;
export const SITE_TITLE_APPEND = `| ${OWNER_NAME}`;
export const SITE_DESCRIPTION =
	"Senior software tinkerer from India. 💜 React, Elixir and TypeScript, CS and mechanical keyboards!";
export const SITE_OG_IMAGE = "/og-image.png";

export const DEFAULT_LOCALE = "en-IN";

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_DEBUG = process.env.DEBUG_MODE === "true";

/**
 * Check if the site is currently being built, to affect build-time behaviour—only exposed during build step
 * @see https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#system-environment-variables
 */
export const IS_CI = process.env.CI === "1";
