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
	GrayBtn,
	Spacer,
	SpacerRow
} from "./ExerciseTemplate.styles";

function ExerciseTemplate({
	exercise,
	exerciseIdx,
	handleDeleteExercise,
	handleAddSet,
	handleDeleteSet,
	handleEditSetDetail
}) {
	return (
		<Container>
			<Stack direction='column' spacing={2}>
				{/* Name and Close Button */}
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Header>{exercise.name}</Header>
					<RedXBtn onClick={() => handleDeleteExercise(exerciseIdx)}>
						<CloseIcon
							style={{
								width: "20px",
								height: "20px"
							}}
						/>
					</RedXBtn>
				</Stack>

				<SpacerRow></SpacerRow>

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
						<Spacer></Spacer>
					</Stack>

					{/* Set Rows */}
					{exercise.sets.map((set, idx) => (
						<ExerciseSetRow
							key={idx}
							exerciseIdx={exerciseIdx}
							setIdx={idx}
							handleDeleteSet={handleDeleteSet}
							handleEditSetDetail={handleEditSetDetail}
						/>
					))}

					{/* Add Set Row Button */}
					<GrayBtn onClick={() => handleAddSet(exerciseIdx)}>
						+ Add Set
					</GrayBtn>
				</Stack>
			</Stack>
		</Container>
	);
}

export default ExerciseTemplate;
