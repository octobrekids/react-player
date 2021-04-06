import React, { RefObject, useContext } from 'react';
import { useRef } from 'react';

const CanvasContext = React.createContext({} as CanvasContextType);

export const CanvasProvider: React.FC = ({ children }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvas = canvasRef.current;
	let ratio;

	const prepareCanvas = (width: number, height: number) => {
		window.addEventListener('resize', resize);
		if (canvas) {
			ratio = canvas.width / window.innerWidth;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	};

	const resize = () => {
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	};

	const draw = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			context?.fillRect(0, 0, canvas.width, canvas.height);
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
