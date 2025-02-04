import Image from "next/image";
import Link from "next/link"

import { DOCS_IMAGE } from "@/lib/constants";

import DocNameInput from "@/components/common/doc-name-input";
import DocMenuBar from "@/components/common/doc-menu-bar";
import { UserButton } from "@clerk/nextjs";
import { OrganizationUserButton } from "../organization-user-button";

const DocsNav = () => {
	return (
		<nav className="px-5 py-4 bg-white print:hidden">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Link href="/docs">
						<Image src={DOCS_IMAGE} width={42} height={42} alt="" />
					</Link>
					<div className="flex flex-col">
						<DocNameInput />
						<DocMenuBar />
					</div>
				</div>
				<OrganizationUserButton />
			</div>
		</nav>
	)
}

export default DocsNav;