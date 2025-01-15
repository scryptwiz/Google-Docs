type Props = {
	children: React.ReactNode
}

const AuthContainer = ({ children }: Props) => {
	return <div className='flex flex-col items-center justify-center h-screen'>{children}</div>
}

export default AuthContainer