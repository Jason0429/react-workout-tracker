import styled from "styled-components";
import { Typography } from "@mui/material";

function WorkoutRow() {
	const Row = styled.div`
		width: 100%;
		height: 50px;
		background: #fefefe;
		border-top: thin solid black;
		border-bottom: thin solid black;
		display: flex;
		align-items: center;
	`;

	return (
		<Row>
			<Typography variant='h7' ml={2}>
				Workout Title
			</Typography>
		</Row>
	);
}

export default WorkoutRow;
