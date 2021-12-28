import styled from "styled-components";
import { Stack } from "@mui/material";

export const Container = styled.div`
	margin-top: 50px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MyStack = styled(Stack)`
	width: 300px;
`;

export const Header = styled.div`
	padding: 50px;
	font-size: 2em;
`;

export const BlueBtn = styled.div`
	font-weight: bold;
	width: 300px;
	background: #00bfff15;
	color: #00bfff;
	padding: 8px;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		color: #00bfff80;
	}
`;

export const GreenBtn = styled.div`
	font-weight: bold;
	width: 300px;
	background: #66ff0030;
	color: #52cc00;
	padding: 8px;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		color: #52cc0080;
	}
`;
