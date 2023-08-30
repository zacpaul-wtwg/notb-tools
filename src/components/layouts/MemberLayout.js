import { withAuthenticator } from "@aws-amplify/ui-react"

function MemberLayoutContent({ children }) {
	return (
		<div>
			<header>Member Header</header>
			<main>{children}</main>
			<footer>Member Footer</footer>
		</div>
	)
}

const MemberLayout = withAuthenticator(MemberLayoutContent)
export default MemberLayout
