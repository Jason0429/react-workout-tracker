import styled from "styled-components";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

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

export const BlueBtn = styled(NavLink)`
	font-weight: bold;
	width: 300px;
	background: #00bfff15;
	color: #00bfff;
	padding: 8px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		color: #00bfff80;
	}
`;
