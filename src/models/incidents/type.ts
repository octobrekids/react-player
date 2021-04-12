export type IncidentTypes = {
	label: string;
	color: string;
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
