// Material
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from "@mui/material";

function ConfirmationDialog({ open, onClose, title, message, yesFunction }) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
					{/* Are you sure you want to delete{" "}
            <span style={{ fontWeight: "bold" }}>{exercise?.name}</span>
            ? */}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant='outlined' onClick={yesFunction}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmationDialog;
