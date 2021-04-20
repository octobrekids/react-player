export type AnnotationTypes = {
	label: string;
	startTime: number;
	endTime: number;
	finish: boolean;
	incidents: [
		{
			x: number;
			y: number;
			height: number;
			width: number;
			time: number;
		}
	];
};
