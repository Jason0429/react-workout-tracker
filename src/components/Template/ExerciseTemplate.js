import styled from "styled-components";
import { Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExerciseSetRow from "./ExerciseSetRow";

function ExerciseTemplate({ exercise, handleDeleteExercise, handleAddSet }) {
	const Container = styled.div`
		background: #cecece50;
		padding: 20px;
		border-radius: 20px;
		width: 400px;
	`;

	const Header = styled.div`
		font-weight: bold;
		font-size: 1.2em;
	`;

	const SubHeader = styled.div`
		font-weight: bold;
		font-size: 0.9em;
		width: 50px;
		text-align: center;
		color: darkslategray;
	`;

	const RedXBtn = styled.div`
		font-weight: bold;
		height: 22px;
		width: 35px;
		border-radius: 20px;
		background: #ffcccb;
		color: #ff726f;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		&:hover {
			color: #ff726f80;
		}
	`;

	const GrayBtn = styled.div`
		background: #cecece;
		color: #00000090;
		font-weight: bold;
		font-size: 0.9em;
		border-radius: 20px;
		padding: 5px;
		text-align: center;
		cursor: pointer;

		&:hover {
			color: #00000060;
		}
	`;

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
							setNumber={key + 1}
							set={set}
							key={key}
						/>
					))}

					{/* Add Set Row Button */}
					<GrayBtn onClick={handleAddSet}>+ Add Set</GrayBtn>
				</Stack>
			</Stack>
		</Container>
	);
}

export default ExerciseTemplate;
