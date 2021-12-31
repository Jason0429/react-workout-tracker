import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Button = styled.div`
	border-radius: 5px;
	box-shadow: 0 0 2px 1px #00000030;
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
