import styled from "styled-components";

export const Screen = styled.div`
	height: calc(100vh - 200px);
	width: 428px;
	/* border: thin solid black; */
	display: flex;
	flex-direction: column;
`;

export const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const RowCenter = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
