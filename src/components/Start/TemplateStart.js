// React
import { useState } from "react";

// Styles
import * as Styles from "./TemplateStart.styles";

// Material
import {
	Stack,
	Typography,
	IconButton,
	Divider,
	Menu,
	MenuItem,
	ListItemIcon
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TemplateStart({ template, templateIdx, handleDeleteTemplate }) {
	const maxNumberOfDisplayableExercises = 4;
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);

	function renderExerciseNames() {
		let toRender = [];

		for (let i = 0; i < template.exercises.length; i++) {
			if (i >= maxNumberOfDisplayableExercises) {
				toRender.push("...");
				return toRender;
			} else {
				toRender.push(template.exercises[i].name);
			}
		}

		return toRender;
	}

	function handleOpenMenu(e) {
		setAnchorEl(e.target);
	}

	function handleCloseMenu() {
		setAnchorEl(null);
	}

	return (
		<Styles.Container>
			<Stack
				direction='column'
				spacing={0}
				divider={<Divider orientation='horizontal' flexItem />}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<Typography
						variant='subtitle1'
						style={{ fontWeight: "bold" }}
					>
						{template.name}
					</Typography>
					<IconButton size='small' onClick={handleOpenMenu}>
						<MoreVertIcon />
					</IconButton>

					<Menu
						anchorEl={anchorEl}
						open={openMenu}
						onClose={handleCloseMenu}
						onClick={handleCloseMenu}
						transformOrigin={{
							horizontal: "right",
							vertical: "top"
						}}
						anchorOrigin={{
							horizontal: "right",
							vertical: "bottom"
						}}
					>
						<MenuItem>
							<ListItemIcon>
								<EditIcon fontSize='small' />
							</ListItemIcon>
							<Typography>Edit</Typography>
						</MenuItem>
						<MenuItem
							onClick={() => handleDeleteTemplate(templateIdx)}
						>
							<ListItemIcon>
								<DeleteForeverIcon
									fontSize='small'
									style={{ color: "#ff726f" }}
								/>
							</ListItemIcon>
							<Typography color='#ff726f'>Delete</Typography>
						</MenuItem>
					</Menu>
				</Stack>

				<Stack
					direction='column'
					spacing={0}
					style={{
						height: "100%"
					}}
				>
					{renderExerciseNames().map((e, idx) => (
						<Typography
							variant='caption'
							noWrap
							style={{ width: "90%" }}
							key={idx}
						>
							{e}
						</Typography>
					))}
				</Stack>
			</Stack>
		</Styles.Container>
	);
}

export default TemplateStart;
