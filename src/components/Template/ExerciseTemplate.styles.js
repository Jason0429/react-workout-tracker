import styled from "styled-components";

export const Container = styled.div`
	background: #cecece50;
	padding: 15px;
	border-radius: 20px;
	width: 350px;
`;

export const Header = styled.div`
	font-weight: bold;
	font-size: 1em;
`;

export const SubHeader = styled.div`
	font-weight: bold;
	font-size: 0.9em;
	width: 50px;
	text-align: center;
	color: darkslategray;
`;

export const Spacer = styled.div`
	width: 40px;
`;

export const RedXBtn = styled.div`
	font-weight: bold;
	height: 25px;
	width: 40px;
	border-radius: 5px;
	background: #ffcccb;
	color: #ff726f;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	&:hover {
		color: #ff726f80;
	}
`;

export const GrayBtn = styled.div`
	background: #cecece;
	color: #00000090;
	font-weight: bold;
	font-size: 0.9em;
	border-radius: 5px;
	padding: 5px;
	text-align: center;
	cursor: pointer;

	&:hover {
		color: #00000060;
	}
`;

export const SpacerRow = styled.div`
	width: 100%;
`;
