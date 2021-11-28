import styled from "styled-components";
import { Screen } from "../styled";
import { Button } from "@material-ui/core";

function Login() {
	return (
		<Screen
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Button
				variant='contained'
				style={{
					background: "rgb(144, 202, 249)",
					color: "black",
					fontWeight: "500"
				}}
			>
				Sign In With Google
			</Button>
		</Screen>
	);
}

export default Login;
