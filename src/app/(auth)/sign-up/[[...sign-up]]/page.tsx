import AuthContainer from "@/components/AuthContainer"
import { SignUp } from "@clerk/nextjs"

const Page = () => {
	return (
		<AuthContainer>
			<SignUp />
		</AuthContainer>
	)
}

export default Page