import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Screen } from "../styled";

function AddScreen() {
	return (
		<Screen>
			<Box
				component='form'
				sx={{
					"& > :not(style)": { m: 1, width: "25ch" }
				}}
				noValidate
				autoComplete='off'
			>
				<TextField
					id='outlined-basic'
					label='Outlined'
					variant='outlined'
				/>
				<TextField id='filled-basic' label='Filled' variant='filled' />
				<TextField
					id='standard-basic'
					label='Standard'
					variant='standard'
				/>
			</Box>
		</Screen>
	);
}

export default AddScreen;
