import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Logo = styled.div`
	font-size: 20px;
`;

export const Nav = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 50px;
	width: 100%;
	background: #fefefe;
	/* padding: 0 px; */
	display: flex;
	justify-content: space-around;
	align-items: center;
	box-shadow: 0 0 1px 1px #00000020;
	background: white;
	z-index: 2;
`;
