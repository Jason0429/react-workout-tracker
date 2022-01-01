import { v4 as uuidv4 } from "uuid";

export function Template() {
	return {
		name: "",
		exercises: [],
		id: uuidv4()
	};
}
