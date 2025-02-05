import Image from "next/image";
import Link from "next/link"


import DocNameInput from "@/components/common/doc-name-input";
import DocMenuBar from "@/components/common/doc-menu-bar";
import { OrganizationUserButton } from "../organization-user-button";
import { DOCS_IMAGE } from "@/constants/images";
import { preloadedDocProps } from "@/constants/types";
import { Inbox } from "./inbox";
import { Avatars } from "./avatar";

const DocsNav = ({ preloadedDoc }: preloadedDocProps) => {
	return (
		<nav className="px-5 py-4 bg-white print:hidden">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Link href="/docs">
						<Image src={DOCS_IMAGE} width={42} height={42} alt="" />
					</Link>
					<div className="flex flex-col">
						<DocNameInput preloadedDoc={preloadedDoc} />
						<DocMenuBar preloadedDoc={preloadedDoc} />
					</div>
				</div>
				<div className="flex">
					<Avatars />
					<Inbox />
					<OrganizationUserButton />
				</div>
			</div>
		</nav>
	)
}

export default DocsNav;