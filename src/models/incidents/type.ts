export type AnnotationTypes = {
	label: string;
	startTime: number;
	endTime: number;
	finish: boolean;
	incidents: IncidentType[];
};

export type IncidentType = {
	x: number;
	y: number;
	height: number;
	width: number;
	time: number;
};
