const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
	return (
		<div className="flex items-end h-8 border-b relative select-none print:hidden border-s2/20">
			<div id="ruler-container" className="max-w-[816px] mx-auto w-full h-full relative">
				<div className="absolute inset-x-0 bottom-0 h-full">
					<div className="relative h-full min-w-[816px]">
						{markers.map((marker) => {
							const position = (marker * 816) / 82;
							return (
								<div key={marker} className="absolute bottom-0" style={{ left: `${position}px` }} >
									{marker % 10 === 0 && (
										<>
											<div className="absolute bottom-0 w-[1px] h-2 bg-s2" />
											<span className="absolute text-[10px] bottom-2 transform -translate-x-1/2">
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
							)
						}
						)}
					</div>
				</div>
			</div>
		</div>
	)
}