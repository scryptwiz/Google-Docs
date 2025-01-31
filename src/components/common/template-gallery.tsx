"use client";

import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTemplateStore } from "@/hooks/useTemplateStore";

export const TemplateGallery = () => {
	const router = useRouter();
	const { hideTemplates, toggleTemplates } = useTemplateStore();

	const displayedTemplates = hideTemplates
		? templates.filter((template) => template.id === "blank")
		: templates;

	return (
		<div className="bg-s6">
			<div className="max-w-screen-lg mx-auto px-16 py-6 flex flex-col gap-y-4">
				<div className="flex items-center justify-between w-full">
					<h3 className="text-s1">Start a new document</h3>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="border-none focus:outline-none px-2 py-2 transition-all duration-300 rounded-full hover:bg-s1/20 bg-transparent shadow-none">
								<EllipsisVertical size={24} strokeWidth={2} className="text-s1" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-36" align="end">
							<DropdownMenuItem onSelect={toggleTemplates}>
								{hideTemplates ? "Show Templates" : "Hide Templates"}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Carousel>
					<CarouselContent className="-ml-4">
						{displayedTemplates.map((template) => (
							<CarouselItem
								key={template.id}
								className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
							>
								<div
									className={cn(
										"aspect-[3/4] flex flex-col gap-y-2.5",
										// isCreating && "pointer-events-none opacity-50"
									)}
								>
									<button
										// disabled={isCreating}
										onClick={() => { router.push(`/docs/${template.id}`) }}
										style={{
											backgroundImage: `url(${template.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
										className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
									/>
									<p className="text-sm font-medium text-gray-600 truncate tracking-wider">{template.label}</p>
									<span className="text-sm font-light -mt-3 tracking-wider">{template?.desc}</span>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	)
}