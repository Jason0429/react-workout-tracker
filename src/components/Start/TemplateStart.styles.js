import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
	padding: 4px 10px;
	border-radius: 5px;
	box-shadow: 0 0 1px 1px #00000020;
	height: 150px;
	width: 100%;
	background: white;
	text-decoration: none;
	position: relative;
	cursor: pointer;

	&:hover {
		background: #fdfdfd;
	}
`;

export const Header = styled.div`
	font-weight: bold;
`;
