import styled from "styled-components";
import GoogleSignInBtn from "../components/Login/GoogleSignInBtn";

function LoginPage() {
	const Container = styled.div`
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	return (
		<Container>
			<GoogleSignInBtn onClick={null} />
		</Container>
	);
}

export default LoginPage;
