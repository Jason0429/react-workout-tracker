import { useState } from "react";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { exercises } from "../../data/exercises";

function ExercisesDialog({ onClose, selectedValue, open }) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleClose = () => {
		onClose(selectedValue);
		setSearchTerm("");
	};

	const handleListItemClick = (value) => {
		onClose(value);
		setSearchTerm("");
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth={true}>
			<DialogTitle>Select an Exercise</DialogTitle>
			<TextField
				label='Search for exercise'
				variant='filled'
				onChange={handleSearch}
			/>
			<List sx={{ pt: 0 }}>
				{exercises
					.filter((exercise) =>
						exercise.name.toLowerCase().includes(searchTerm)
					)
					.map((exercise) => (
						<ListItem
							button
							onClick={() => handleListItemClick(exercise)}
							key={exercise.id}
						>
							<ListItemAvatar>
								<Avatar
									sx={{
										bgcolor: blue[100],
										color: blue[600]
									}}
								>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={exercise?.name} />
						</ListItem>
					))}
			</List>
		</Dialog>
	);
}

export default ExercisesDialog;
