// React
import { useState } from "react";

// Material
import {
	Stack,
	Paper,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Components
import ExerciseSetRow from "./ExerciseSetRow";

// Styles
import {
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
	const [expanded, setExpanded] = useState(true);

	return (
		<Paper
			variant='outlined'
			sx={{
				background: "#cecece50",
				width: "350px"
			}}
		>
			<Accordion
				disableGutters
				expanded={expanded}
				onChange={() => setExpanded((expanded) => !expanded)}
				sx={{
					background: "transparent",
					boxShadow: "none"
				}}
			>
				<AccordionSummary>
					{/* Name and Close Button */}
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						width='100%'
					>
						<IconButton size='small'>
							<KeyboardArrowDownIcon
								sx={{
									// width: "100%",
									transform: `rotate(${
										expanded ? "0deg" : "180deg"
									})`,
									transition: "0.1s ease-in-out"
								}}
							/>
						</IconButton>
						<Header>{exercise.name}</Header>
						<RedXBtn
							onClick={() => handleDeleteExercise(exerciseIdx)}
						>
							<CloseIcon
								style={{
									width: "20px",
									height: "20px"
								}}
							/>
						</RedXBtn>
					</Stack>
				</AccordionSummary>

				<AccordionDetails>
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
								set={set}
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
				</AccordionDetails>
			</Accordion>
		</Paper>
	);
}

export default ExerciseTemplate;
