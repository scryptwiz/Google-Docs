import AuthContainer from "@/components/AuthContainer"
import { SignIn } from "@clerk/nextjs"

const Page = () => {
	return (
		<AuthContainer>
			<SignIn />
		</AuthContainer>
	)
}

export default Page