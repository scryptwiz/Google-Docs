import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Image, SearchIcon, UploadIcon, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ImageButton = () => {
	const { editor } = EditorStore();
	const [imageUri, setImageUri] = useState("");
	const [openDialog, setOpenDialog] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isValidImage, setIsValidImage] = useState(false);
	const [isValidating, setIsValidating] = useState(false);

	const onchange = (src: string) => {
		editor?.chain().focus().setImage({ src }).run();
	};

	const upload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.addEventListener("change", () => {
			const file = input.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const src = e.target?.result as string;
					setImageUri(src);
					onchange(src);
				};
				reader.readAsDataURL(file);
			}
		});

		input.click();
	};

	const validateImageUrl = async (url: string) => {
		setIsValidating(true);
		try {
			const response = await fetch(url, { method: "HEAD" });
			if (!response.ok) {
				throw new Error("Invalid URL");
			}
			const contentType = response.headers.get("Content-Type");
			if (!contentType || !contentType.startsWith("image/")) {
				throw new Error("URL is not an image");
			}
			setIsValidImage(true);
			setError(null);
		} catch (err) {
			setIsValidImage(false);
			setError("Please provide a valid image URL.");
		} finally {
			setIsValidating(false);
		}
	};

	const handleImageUrl = () => {
		if (isValidImage) {
			onchange(imageUri);
			setImageUri("");
			setOpenDialog(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="overflow-hidden min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm px-1.5 hover:bg-s1/15 text-xs h-7 gap-1">
						<Image className="size-4" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-white shadow-md rounded-md p-2">
					<DropdownMenuItem onClick={upload} className="flex items-center p-2 rounded-md hover:bg-s2/20 cursor-pointer hover:border-none hover:outline-none">
						<UploadIcon className="size-4 mr-2" />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenDialog(true)} className="flex items-center p-2 rounded-md hover:bg-s2/20 cursor-pointer hover:border-none hover:outline-none">
						<SearchIcon className="size-4 mr-2" />
						Paste URL of image...
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Paste Image URL</DialogTitle>
						<DialogDescription>Paste the URL of the image you want to insert.</DialogDescription>
					</DialogHeader>
					<div className="flex items-center gap-2">
						<Input
							type="text"
							placeholder="Insert Image URL"
							value={imageUri}
							onChange={(e) => {
								const value = e.target.value;
								setImageUri(value);
								setError(null);
								setIsValidImage(false);
								if (value) validateImageUrl(value);
							}}
							className="outline-none rounded-none border-2 border-p1 border-x-0 border-t-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-x-0 focus-visible:border-t-0 focus-visible:border-b-2 focus-visible:border-p1"
						/>
						{/* Spinner */}
						{isValidating && <Loader2 className="animate-spin text-p1 size-4" />}
					</div>
					{/* Error message */}
					{error && <span className="text-red-500 text-xs -mt-1">{error}</span>}
					<DialogFooter>
						<Button variant="outline" onClick={() => setOpenDialog(false)} className="hover:bg-p1/5 border-p1/15 text-p1 hover:text-p1">
							Cancel
						</Button>
						<Button
							variant="outline"
							disabled={!isValidImage}
							onClick={handleImageUrl}
							className={`hover:bg-p1/5 border-p1/15 text-p1 hover:text-p1 ${!isValidImage ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							Insert Image
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};