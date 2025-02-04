import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export const OrganizationUserButton = () => {
	return (
		<div className="flex items-center gap-2">
			<OrganizationSwitcher
				afterCreateOrganizationUrl="/"
				afterSelectOrganizationUrl="/"
				afterLeaveOrganizationUrl="/"
				afterSelectPersonalUrl="/"
			/>
			<UserButton
				appearance={{
					elements: {
						avatarBox: "size-8",
					},
				}}
			/>
		</div>

	)
}