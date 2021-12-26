import styled from "styled-components";
import { Stack, Input } from "@mui/material";

function ExerciseSetRow({ setNumber, set }) {
	const { reps, lbs, rpe } = set;
	const SetNumber = styled.div`
		font-weight: bold;
		font-size: 0.9em;
		width: 50px;
		text-align: center;
	`;

	const MyInput = styled(Input)`
		width: 50px;
	`;

	return (
		<Stack
			direction='row'
			justifyContent='space-evenly'
			alignItems='center'
		>
			<SetNumber>{setNumber}</SetNumber>
			<MyInput type='number' value={reps} />
			<MyInput type='number' value={lbs} />
			<MyInput type='number' value={rpe} />
		</Stack>
	);
}

export default ExerciseSetRow;
