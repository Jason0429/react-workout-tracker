// React
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
	ListItemIcon,
	Paper
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TemplateStart({ template, handleDeleteTemplate }) {
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
		<Paper
			variant='outlined'
			sx={{
				padding: "4px 10px",
				height: "150px",
				position: "relative",
				cursor: "pointer"
			}}
		>
			<NavLink
				to={`/start/${template.id}`}
				style={{ textDecoration: "none", color: "initial", zIndex: 1 }}
			>
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
					</Stack>

					<Stack direction='column' spacing={0} pt={1} pb={1}>
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
			</NavLink>
			<IconButton
				size='small'
				onClick={handleOpenMenu}
				style={{
					zIndex: 3,
					position: "absolute",
					right: 0,
					top: 0
				}}
			>
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
				<MenuItem
					component={NavLink}
					to={`/template/edit/${template.id}`}
				>
					<ListItemIcon>
						<EditIcon fontSize='small' />
					</ListItemIcon>
					<Typography>Edit</Typography>
				</MenuItem>
				<MenuItem onClick={() => handleDeleteTemplate(template.id)}>
					<ListItemIcon>
						<DeleteForeverIcon
							fontSize='small'
							style={{ color: "#ff726f" }}
						/>
					</ListItemIcon>
					<Typography color='#ff726f'>Delete</Typography>
				</MenuItem>
			</Menu>
		</Paper>
	);
}

export default TemplateStart;
