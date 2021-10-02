import localforage from "localforage";

import { TFoobarData, TFoobarContext, TFoobarPage, FOOBAR_PAGES } from "@/typings/console";

export const IS_DEV = process.env.NODE_ENV === "development";

export const doAsyncThings = async () => {
	await localforage.setItem("foobar", "/foobar/localforage");
};

export const getDataFromLocalForage = async <T extends unknown>(key: string): Promise<T | null> => {
	try {
		return await localforage.getItem(key);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		throw new Error("no local data in localforage");
	}
};

export const saveToLocalForage = async <T extends Record<string, unknown>>(data: T) => {
	try {
		await localforage.setItem("foobar-data", data);
	} catch (error) {
		throw new Error(error as string);
	}
};
export const updateLocalData = async (data: Record<string, unknown>) => {
	await saveToLocalForage(data);
};

export const loadLocalDataOnMount = async (): Promise<TFoobarData | null> => {
	const data = await getDataFromLocalForage<TFoobarData>("foobar-data");
	return data;
};

export const KONAMI_CODE: Array<React.KeyboardEvent["key"]> = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

export const checkIfKonamiCodeEntered = (codes: Array<string>) => {
	const joinedCodes = codes.join(""),
		konamiCodeJoined = KONAMI_CODE.join("");
	return joinedCodes === konamiCodeJoined;
};

export const handleKonami = (
	konamiCodeInput: Array<string>,
	{ konami, updateFoobarDataPartially, unlocked, completed }: TFoobarContext
) => {
	const check = unlocked && checkIfKonamiCodeEntered(konamiCodeInput);
	let updatedKonamiCodeInput: Array<string> | null = null;

	if (check) {
		const completedCopy = [...completed];
		completedCopy.push(FOOBAR_PAGES.konami);
		updateFoobarDataPartially({
			konami: !konami,
			completed: completedCopy,
		});
	} else {
		if (konamiCodeInput.length > 10) {
			updatedKonamiCodeInput = [...konamiCodeInput];
			updatedKonamiCodeInput.shift();
		}
	}

	return updatedKonamiCodeInput;
};

export const mergeLocalDataIntoStateOnMount = (
	parent: TFoobarData,
	localforageData: TFoobarData | null
): TFoobarData => {
	if (localforageData === null) return parent;
	const result = { ...parent },
		localforageCopy = { ...localforageData };
	for (const key in localforageData) {
		if (key === "unlocked" || key === "konami") {
			result[key] = localforageCopy[key] ? localforageCopy[key] : result[key];
		} else if (key === "completed" || key === "visitedPages") {
			result[key] = [...new Set([...result[key], ...localforageCopy[key]])] as Array<TFoobarPage> &
				Array<string>;
		}
	}
	return result;
};

export const isObject = (item: Record<string, unknown>): boolean => {
	return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeDeep = (target: any, ...sources: any): any => {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
};

export const logConsoleMessages = () => {
	// eslint-disable-next-line no-console
	console.log(
		`%c${CONSOLE_REACT}`,
		`color: #61DAFB;
		font-weight: bold;
		font-size: 1.1em;
		background-color: black;
		line-height: 1.1`
	);
	// eslint-disable-next-line no-console
	console.log(
		`        %c${CONSOLE_GREETING}`,
		"font-size: 1.5em; font-family: monospace; font-weight: bold;"
	);
	// eslint-disable-next-line no-console
	console.log(`%c${CONSOLE_MESSAGE}`, "font-size: 1.1em; font-family: monospace");

	// eslint-disable-next-line no-console
	console.groupCollapsed("need a hint?");
	// eslint-disable-next-line no-console
	console.log(`%c${CONSOLE_X}`, "font-family: monospace");
	// eslint-disable-next-line no-console
	console.groupEnd();

	dog("Hello", "there!");
};

/**
 * `dog`: development-only `console.log`
 * @param messages to be logged only during dev
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dog = (...messages: Array<any>): void => {
	IS_DEV &&
		// eslint-disable-next-line no-console
		console.log(
			"%cdev%c🐶",
			`font-family: monospace;
			color: indianred;
			background-color: #eee;
			border-radius: 2px;
			padding: 2px;
			margin-right: 2px;
			font-size: 1.1em`,
			`font-family: unset;
			color: unset;
			background-color: unset;
			border: unset
			font-size: 1.2em`,
			...messages
		);
};

const CONSOLE_REACT = `
                                           
          ///////        ,///////          
         //       //* ///       //         
         /          ///         ,/         
         /*       //   //       //         
         /////////////////////////         
    ////  //  //,         //.  //  ////    
  //       ////   ///////   ////       //  
 //         //   /////////   //         // 
  ///      ////   ///////   ////      ///  
     ///////  */*         //   //////*     
         //  *///////////////*  //         
         /*       //   //       //         
        ./          ///         ./         
         //       //  ///       //         
          ///////         ///////          
                                           
`;

const CONSOLE_GREETING = "Hello Beautiful Nerd!";
const CONSOLE_MESSAGE = `
You like checking consoles, eh? I like you!

Up for geeking out some more?
I've setup some top-secret pages on here, see if you can catch 'em all!

If you complete them all, lemme know, bouquets and brickbats alike :)
To start, how /about you get to know me better?


Cheers, Good Luck, and most importantly, Have Fun!`;
const CONSOLE_X = `storytime!

I loved playing video games since I was a kid, and one of my all time favorites was Age of Empires III. Sometimes (read: almost every single time) when I'd get stuck or was at a disadvantages against NPCs, I'd just go ahead and use the inbuilt cheats! (remember Medium Rare Please?)

Anyway, cheats might not work (yet) on here, but "revealing the map" will guide you to what you seek :D


Please don't hesitate reaching out for more hints!
`;
