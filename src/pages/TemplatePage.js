import { useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Stack } from "@mui/material";
import ExercisesDialog from "../components/Template/ExercisesDialog";
import ExerciseTemplate from "../components/Template/ExerciseTemplate";
import { Set } from "../models/Set";

const Container = styled.div`
	margin-top: 50px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MyStack = styled(Stack)`
	width: 300px;
`;

const Header = styled.div`
	padding: 50px;
	font-size: 2em;
`;

const BlueBtn = styled.div`
	font-weight: bold;
	width: 300px;
	background: #00bfff15;
	color: #00bfff;
	padding: 8px;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		color: #00bfff80;
	}
`;

const GreenBtn = styled.div`
	font-weight: bold;
	width: 300px;
	background: #66ff0030;
	color: #52cc00;
	padding: 8px;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;

	&:hover {
		color: #52cc0080;
	}
`;

function TemplatePage() {
	const [template, setTemplate] = useState({
		name: "",
		exercises: []
	});

	const [open, setOpen] = useState(false);

	const handleName = (e) => {
		setTemplate((prev) => ({
			...prev,
			name: e.target.value.trim()
		}));
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (exercise) => {
		if (exercise !== "")
			setTemplate((prev) => ({
				...prev,
				exercises: [...prev["exercises"], exercise]
			}));

		setOpen(false);
	};

	const handleDeleteExercise = (id) => {
		setTemplate((prev) => ({
			...prev,
			exercises: prev["exercises"].filter((e) => e.id !== id)
		}));
	};

	const handleAddSet = (id) => {
		setTemplate((prev) => ({
			...prev,
			exercises: prev["exercises"].map((e) =>
				e.id === id
					? {
							...e,
							sets: [...e["sets"], new Set()]
					  }
					: e
			)
		}));
	};

	return (
		<Container>
			<Header variant='h5'>Create a Workout Template</Header>
			<MyStack direction='column' spacing={3} alignItems='center'>
				{/* Variants: outlined, standard, filled */}
				<TextField
					label='Workout Name'
					variant='outlined'
					onChange={handleName}
				/>
				{/* Render all exercises here */}
				<Stack direction='column' spacing={2} alignItems='center'>
					{template.exercises.map((e) => (
						<ExerciseTemplate
							exercise={e}
							handleDeleteExercise={handleDeleteExercise}
							handleAddSet={handleAddSet}
						/>
					))}
				</Stack>

				<BlueBtn onClick={handleOpen}>+ Add Exercise</BlueBtn>
				<GreenBtn onClick={null}>Create Template</GreenBtn>
				<ExercisesDialog
					selectedValue={""}
					open={open}
					onClose={handleClose}
				/>
			</MyStack>
		</Container>
	);
}

export default TemplatePage;
