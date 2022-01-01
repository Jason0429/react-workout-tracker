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
	set,
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
					name='reps'
					type='number'
					value={set?.reps}
					onChange={(e) =>
						handleEditSetDetail(e, exerciseIdx, setIdx)
					}
				/>

				<MyInput
					name='lbs'
					type='number'
					value={set?.lbs}
					onChange={(e) =>
						handleEditSetDetail(e, exerciseIdx, setIdx)
					}
				/>
				<MyInput
					name='rpe'
					type='number'
					value={set?.rpe}
					onChange={(e) =>
						handleEditSetDetail(e, exerciseIdx, setIdx)
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
