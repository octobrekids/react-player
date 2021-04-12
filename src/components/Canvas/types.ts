import { IncidentTypes } from '../../models/incidents/type';

export type CanvasPropTypes = {
	width: number;
	height: number;
	incidents: IncidentTypes[];
	played: number;
};
