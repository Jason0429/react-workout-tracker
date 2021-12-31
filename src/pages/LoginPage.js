import GoogleLogo from "../img/google-logo.png";
import { Container, Button } from "../components/Login/LoginPage.styles";

function LoginPage({ handleLogin }) {
	return (
		<Container>
			<Button onClick={handleLogin}>
				<img src={GoogleLogo} />
				&nbsp; Sign in with Google
			</Button>
		</Container>
	);
}

export default LoginPage;
