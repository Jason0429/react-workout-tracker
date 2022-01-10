// React
import { useState } from "react";

// Material
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
	IconButton,
	Typography,
	Stack,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function MyExercisesPage({ user }) {
	const [expanded, setExpanded] = useState(true);

	return (
		<Stack
			direction='column'
			sx={{
				height: "100%",
				marginTop: "150px"
			}}
		>
			<Paper variant='outlined'>
				<Accordion
					disableGutters
					expanded={expanded}
					onChange={() => setExpanded((expanded) => !expanded)}
					sx={{
						// background: "transparent",
						boxShadow: "none"
					}}
				>
					<AccordionSummary>
						<Stack direction='row' alignItems='center' spacing={2}>
							<IconButton size='small'>
								<KeyboardArrowDownIcon
									sx={{
										transform: `rotate(${
											expanded ? "0deg" : "180deg"
										})`,
										transition: "0.2s ease-in-out"
									}}
								/>
							</IconButton>
							<Typography variant='h6'>My Exercises</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails>
						<List sx={{ width: "350px", padding: "0" }}>
							{user.exercises.map((exercise, idx) => (
								<ListItem
									divider
									key={idx}
									secondaryAction={
										<IconButton
											edge='end'
											aria-label='delete'
											// To delete exercise
											onClick={null}
										>
											<DeleteIcon />
										</IconButton>
									}
								>
									{/* <ListItemButton> */}
									<ListItemText primary={exercise.name} />
									{/* </ListItemButton> */}
								</ListItem>
							))}
						</List>
					</AccordionDetails>
				</Accordion>
			</Paper>
		</Stack>
	);
}

export default MyExercisesPage;
