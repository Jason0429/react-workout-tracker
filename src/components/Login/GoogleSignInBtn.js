import GoogleLogo from "../../img/google-logo.png";
import styled from "styled-components";

function GoogleSignInBtn() {
	const Button = styled.div`
		border-radius: 20px;
		box-shadow: 0 0 15px 2px #00000020;
		padding: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		cursor: pointer;

		&:hover {
			background: #00000005;
		}

		img {
			height: 20px;
			width: 20px;
		}
	`;

	return (
		<Button>
			<img src={GoogleLogo} />
			&nbsp; Sign in with Google
		</Button>
	);
}

export default GoogleSignInBtn;
