import GoogleLogo from "../img/google-logo.png";
import { Stack } from "@mui/material";
import { Button } from "../components/Login/LoginPage.styles";

function LoginPage({ handleLogin }) {
	return (
		<Stack
			direction='column'
			justifyContent='center'
			alignItems='center'
			height='100vh'
		>
			<Button onClick={handleLogin}>
				<img src={GoogleLogo} />
				&nbsp; Sign in with Google
			</Button>
		</Stack>
	);
}

export default LoginPage;
