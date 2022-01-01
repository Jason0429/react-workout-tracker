import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
	margin-top: 50px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const BlueBtn = styled.div`
	font-weight: bold;
	width: 300px;
	background: #00bfff15;
	color: #00bfff;
	padding: 8px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		color: #00bfff80;
	}
`;

export const GreenBtn = styled(NavLink)`
	font-weight: bold;
	width: 300px;
	background: #66ff0030;
	color: #52cc00;
	padding: 8px;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		color: #52cc0080;
	}
`;

export const RedBtn = styled(NavLink)`
	font-weight: bold;
	width: 300px;
	padding: 8px;
	border-radius: 5px;
	background: #ffcccb;
	text-decoration: none;
	color: #ff726f;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		color: #ff726f80;
	}
`;

export const FullRowFixed = styled.div`
	width: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 150px;
	background: white;
	box-shadow: 0 0 1px 1px #00000020;
	bottom: 0;
	left: 0;
	z-index: 2;
`;
