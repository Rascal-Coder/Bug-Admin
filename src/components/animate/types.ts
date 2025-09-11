export type VariantsType = {
	durationIn?: number;
	durationOut?: number;
	easeIn?: [number, number, number, number];
	easeOut?: [number, number, number, number];
	distance?: number;
};

export type TranHoverType = {
	duration?: number;
	ease?: [number, number, number, number];
};
export type TranEnterType = {
	durationIn?: number;
	easeIn?: [number, number, number, number];
};
export type TranExitType = {
	durationOut?: number;
	easeOut?: [number, number, number, number];
};

export type BackgroundType = {
	duration?: number;
	ease?: [number, number, number, number];
	colors?: string[];
};
