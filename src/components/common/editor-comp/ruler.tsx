import { LEFT_MARGIN, RIGHT_MARGIN } from "@/constants/ui";
import { useMutation, useStorage } from "@liveblocks/react";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
	const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN;
	const setLeftMargin = useMutation(({ storage }, position: number) => {
		storage.set("leftMargin", position);
	}, [])
	const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN;
	const setRightMargin = useMutation(({ storage }, position: number) => {
		storage.set("rightMargin", position);
	}, [])

	const [isDraggingLeft, setIsDraggingLeft] = useState(false);
	const [isDraggingRight, setIsDraggingRight] = useState(false);
	const rulerRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (isLeft: boolean) => {
		if (isLeft) {
			setIsDraggingLeft(true);
		} else {
			setIsDraggingRight(true);
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
			const container = rulerRef.current.querySelector("#ruler-container");
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const relativeX = e.clientX - containerRect.left;
				const rawPosition = Math.max(0, Math.min(816, relativeX));

				if (isDraggingLeft) {
					const maxLeftPosition = 816 - rightMargin - 100;
					setLeftMargin(Math.min(rawPosition, maxLeftPosition));
				} else if (isDraggingRight) {
					const maxRightPosition = 816 - (leftMargin + 100);
					const newRightPosition = Math.max(816 - rawPosition, 0);
					setRightMargin(Math.min(newRightPosition, maxRightPosition));
				}
			}
		}
	};

	const handleMouseUp = () => {
		setIsDraggingLeft(false);
		setIsDraggingRight(false);
	};

	const handleDoubleClick = (isLeft: boolean) => {
		if (isLeft) {
			setLeftMargin(LEFT_MARGIN);
		} else {
			setRightMargin(RIGHT_MARGIN);
		}
	};

	return (
		<div
			ref={rulerRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className="w-[816px] mx-auto h-6 border-b border-s3 flex items-end relative select-none print:hidden"
		>
			<div id="ruler-container" className="w-full h-full relative">
				<Marker
					position={leftMargin}
					isLeft={true}
					isDragging={isDraggingLeft}
					onMouseDown={() => handleMouseDown(true)}
					onDoubleClick={() => handleDoubleClick(true)}
				/>
				<Marker
					position={rightMargin}
					isLeft={false}
					isDragging={isDraggingRight}
					onMouseDown={() => handleMouseDown(false)}
					onDoubleClick={() => handleDoubleClick(false)}
				/>
				<div className="absolute inset-x-0 bottom-0 h-full">
					<div className="relative h-full w-[816px]">
						{markers.map((marker) => {
							const position = (marker * 816) / 82;
							return (
								<div
									key={marker}
									className="absolute bottom-0"
									style={{ left: `${position}px` }}
								>
									{marker % 10 === 0 && (
										<>
											<div className="absolute bottom-0 w-[1px] h-2 bg-s2" />
											<span className="absolute bottom-2 text-[10px] text-s2 transform -translate-x-1/2">
												{marker / 10 + 1}
											</span>
										</>
									)}
									{marker % 5 === 0 && marker % 10 !== 0 && (
										<div className="absolute bottom-0 w-[1px] h-1.5 bg-s2" />
									)}
									{marker % 5 !== 0 && (
										<div className="absolute bottom-0 w-[1px] h-1 bg-s2" />
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

interface MarkerProps {
	position: number;
	isLeft: boolean;
	isDragging: boolean;
	onMouseDown: () => void;
	onDoubleClick: () => void;
}

const Marker = ({
	position,
	isLeft,
	isDragging,
	onMouseDown,
	onDoubleClick,
}: MarkerProps) => {
	return (
		<div
			className="absolute top-0 h-full cursor-ew-resize z-[5] group"
			style={{ [isLeft ? "left" : "right"]: `${position}px` }}
			onMouseDown={onMouseDown}
			onDoubleClick={onDoubleClick}
		>
			<ChevronDown className="absolute z-1 left-1/2 top-0 h-full text-p2 fill-p2 transform -translate-x-1/2" />
			<div
				className="absolute left-1/2 top-4 transform -translate-x-1/2"
				style={{
					height: "100vh",
					width: "1px",
					transform: "scaleX(0.5)",
					backgroundColor: "#4285f4",
					display: isDragging ? "block" : "none",
				}}
			/>
		</div>
	);
};