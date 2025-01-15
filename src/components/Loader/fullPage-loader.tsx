import { Loader } from "lucide-react";

interface FullPageLoaderProps {
	label?: string;
}

export const FullPageLoader = ({ label = "Loading..." }: FullPageLoaderProps) => (
	<div className="absolute inset-0 h-dvh bg-white flex items-center justify-center">
		<div className="flex items-center justify-center">
			<Loader className="size-6 text-muted-foreground animate-spin" />
			<p className="ml-2 text-muted-foreground text-sm">{label}</p>
		</div>
	</div>
)