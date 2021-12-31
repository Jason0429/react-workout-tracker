// Material
import { Stack } from "@mui/material";

// Styles
import {
	SetNumber,
	MyInput,
	CloseIconContainer,
	MyCloseIcon
} from "./ExerciseSetRow.styles";

function ExerciseSetRow({
	exerciseIdx,
	setIdx,
	handleDeleteSet,
	handleEditSetDetail
}) {
	return (
		<>
			<Stack
				direction='row'
				justifyContent='space-evenly'
				alignItems='center'
			>
				<SetNumber>{setIdx + 1}</SetNumber>

				<MyInput
					className='reps'
					type='number'
					onChange={(event) =>
						handleEditSetDetail(event, exerciseIdx, setIdx, "reps")
					}
				/>

				<MyInput
					className='lbs'
					type='number'
					onChange={(event) =>
						handleEditSetDetail(event, exerciseIdx, setIdx, "lbs")
					}
				/>
				<MyInput
					className='rpe'
					type='number'
					onChange={(event) =>
						handleEditSetDetail(event, exerciseIdx, setIdx, "rpe")
					}
				/>
				<CloseIconContainer
					onClick={() => handleDeleteSet(exerciseIdx, setIdx)}
				>
					<MyCloseIcon />
				</CloseIconContainer>
			</Stack>
		</>
	);
}

export default ExerciseSetRow;
