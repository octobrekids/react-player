import React, { RefObject, useContext } from 'react';
import { useRef } from 'react';
import { IncidentTypes } from '../models/incidents/type';

const CanvasContext = React.createContext({} as CanvasContextType);

export const CanvasProvider: React.FC = ({ children }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvas = canvasRef.current;
	const ctx = canvas?.getContext('2d');
	let ratio: number;

	const prepareCanvas = (width: number, height: number) => {
		window.addEventListener('resize', resize);
		if (canvas) {
			ratio = canvas.width / window.innerWidth;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	};

	const showIncident = (incident: IncidentTypes) => {
		incident.visibleCountdown = incident.visibleDuration;
	};

	const resize = () => {
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	};

	const draw = () => {
		if (canvas) {
			ctx?.fillRect(0, 0, canvas.width, canvas.height);
		}
	};

	const drawRect = (incident: IncidentTypes) => {
		ctx?.strokeRect(
			incident.x * ratio,
			incident.y * ratio,
			incident.width * ratio,
			incident.height * ratio
		);
		ctx?.restore();
	};

	const drawLabel = (incident: IncidentTypes) => {
		// label setting
		let fontBase = 32;
		let fontSizeAfterRatio = 16;
		fontSizeAfterRatio =
			fontBase * ratio < 16 ? fontSizeAfterRatio : fontBase * ratio;

		ctx!.font = `${fontSizeAfterRatio}px Arial`;
		let textWidth = ctx?.measureText(incident.label).width;

		ctx!.fillStyle = 'red';
		const paddingLeft = 24;
		const padding = paddingLeft * 2 * ratio;

		if (textWidth) {
			ctx?.fillRect(
				incident.x * ratio - 1,
				incident.y * ratio - (fontSizeAfterRatio + padding),
				textWidth + padding * 2,
				fontSizeAfterRatio + padding
			);
			ctx!.fillStyle = '#000';
			ctx?.fillText(
				incident.label,
				incident.x * ratio + padding,
				incident.y * ratio - padding * 0.75
			);
			ctx?.restore();
		}
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			context?.fillRect(0, 0, canvas.width, canvas.height);
		}
	};
	return (
		<CanvasContext.Provider
			value={{ canvasRef, draw, clearCanvas, prepareCanvas }}
		>
			{children}
		</CanvasContext.Provider>
	);
};

export type CanvasContextType = {
	canvasRef: RefObject<HTMLCanvasElement>;
	draw: () => void;
	clearCanvas: () => void;
	prepareCanvas: (width: number, height: number) => void;
};

export const useCanvas = () => useContext(CanvasContext);
