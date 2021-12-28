// React
import { useRef } from "react";

// Material
import { Stack } from "@mui/material";

// Styles
import { SetNumber, MyInput } from "./ExerciseSetRowStyles";

const ExerciseSetRow = ({
	exerciseId,
	setNumber,
	handleReps,
	handleLbs,
	handleRpe
}) => {
	// const { reps, lbs, rpe } = set;
	const repsRef = useRef();
	const lbsRef = useRef();
	const rpeRef = useRef();

	return (
		<Stack
			direction='row'
			justifyContent='space-evenly'
			alignItems='center'
		>
			<SetNumber>{setNumber}</SetNumber>
			<MyInput
				type='number'
				ref={repsRef}
				onChange={(event) => handleReps(event, exerciseId, setNumber)}
				// value={reps}
			/>
			<MyInput
				type='number'
				ref={lbsRef}
				onChange={(event) => handleLbs(event, exerciseId, setNumber)}
				// value={lbs}
			/>
			<MyInput
				type='number'
				ref={rpeRef}
				onChange={(event) => handleRpe(event, exerciseId, setNumber)}
				// value={rpe}
			/>
		</Stack>
	);
};

export default ExerciseSetRow;
