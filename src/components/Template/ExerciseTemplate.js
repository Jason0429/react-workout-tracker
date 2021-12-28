// Material
import { Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Components
import ExerciseSetRow from "./ExerciseSetRow";

// Styles
import {
	Container,
	Header,
	SubHeader,
	RedXBtn,
	GrayBtn
} from "./ExerciseTemplateStyles";

const ExerciseTemplate = ({
	exercise,
	handleDeleteExercise,
	handleAddSet,
	handleReps,
	handleLbs,
	handleRpe
}) => {
	return (
		<Container>
			<Stack direction='column' spacing={3}>
				{/* Name and Close Button */}
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Header>{exercise.name}</Header>
					<RedXBtn onClick={() => handleDeleteExercise(exercise.id)}>
						<CloseIcon
							style={{
								width: "20px",
								height: "20px"
							}}
						/>
					</RedXBtn>
				</Stack>

				{/* Set, Reps, lbs., RPE headers */}
				<Stack direction='column' spacing={2}>
					<Stack
						direction='row'
						justifyContent='space-evenly'
						alignItems='center'
					>
						<SubHeader>Set</SubHeader>
						<SubHeader>Reps</SubHeader>
						<SubHeader>lbs.</SubHeader>
						<SubHeader>RPE</SubHeader>
					</Stack>

					{/* Set Rows */}
					{exercise.sets.map((set, key) => (
						<ExerciseSetRow
							exerciseId={exercise.id}
							setNumber={key + 1}
							key={key}
							handleReps={handleReps}
							handleLbs={handleLbs}
							handleRpe={handleRpe}
						/>
					))}

					{/* Add Set Row Button */}
					<GrayBtn onClick={() => handleAddSet(exercise.id)}>
						+ Add Set
					</GrayBtn>
				</Stack>
			</Stack>
		</Container>
	);
};

export default ExerciseTemplate;
