import styled from "styled-components";
import { Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const SetNumber = styled.div`
	font-weight: bold;
	font-size: 0.9em;
	width: 50px;
	text-align: center;
`;

export const MyInput = styled(Input)`
	width: 50px;
`;

export const CloseIconContainer = styled.div`
	cursor: pointer;
	width: 40px;
	/* background: #ffcccb; */
	background: #00000020;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const MyCloseIcon = styled(CloseIcon)`
	transform: scale(0.8);
	/* color: #ff726f; */
	color: #00000080;
	/* 
	&:hover {
		color: #ff726f80;
	} */
`;
