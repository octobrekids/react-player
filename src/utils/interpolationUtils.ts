import { IncidentType } from '../models/incidents/type';
import { getLinearInterpolatedValue } from './mathUtils';

const INTERPOLATION_TYPE = {
	LENGTH: 'LENG',
	POSITION: 'POS',
};

type InterpolateDateType = {
	startIncident: IncidentType;
	endIncident: IncidentType;
	currentTime: number;
	//TODO: interpolation type
	type: string;
};

type InterpolatePointType = {
	width: number;
	height: number;
	x: number;
	y: number;
};

const getInterpolatedData = ({
	startIncident,
	endIncident,
	currentTime,
	type,
}: InterpolateDateType) => {
	const interpolated: InterpolatePointType = {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	};
	switch (type) {
		case INTERPOLATION_TYPE.LENGTH:
			interpolated.width = getLinearInterpolatedValue(
				endIncident.time,
				startIncident.time,
				endIncident.width,
				startIncident.width,
				currentTime
			);
			interpolated.height = getLinearInterpolatedValue(
				endIncident.time,
				startIncident.time,
				endIncident.height,
				startIncident.height,
				currentTime
			);
			break;
		case INTERPOLATION_TYPE.POSITION:
			interpolated.x = getLinearInterpolatedValue(
				endIncident.time,
				startIncident.time,
				endIncident.x,
				startIncident.x,
				currentTime
			);
			interpolated.y = getLinearInterpolatedValue(
				endIncident.time,
				startIncident.time,
				endIncident.y,
				startIncident.y,
				currentTime
			);
			break;
		default:
			break;
	}
	return interpolated;
};

export { getInterpolatedData, INTERPOLATION_TYPE };
