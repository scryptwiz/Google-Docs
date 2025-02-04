import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type SharedTooltipProps = {
	message?: string;
	children: React.ReactNode;
}

const SharedTooltip = ({ message = "Shared", children }: SharedTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					{children}
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<p className='print:hidden'>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SharedTooltip;