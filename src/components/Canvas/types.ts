import { AnnotationTypes } from '../../models/incidents/type';

export type CanvasPropTypes = {
	width: number;
	height: number;
	annotations: AnnotationTypes[];
	played: number;
};
