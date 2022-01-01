import styled from "styled-components";
import { Stack } from "@mui/material";

export const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	/* border: thin solid black; */
	margin-top: 100px;
`;

export const Header = styled.div`
	font-weight: bold;
	font-size: 1.5em;
`;

export const MyStack = styled(Stack)`
	width: 100%;
	max-width: 800px;
	padding: 20px;
`;
