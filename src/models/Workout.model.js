import { v4 as uuidv4 } from "uuid";
export function Workout() {
	return {
		name: "",
		exercises: [],
		dateCreated: Date.now(),
		id: uuidv4()
	};
}
