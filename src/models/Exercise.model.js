import { v4 as uuidv4 } from "uuid";
import { Set } from "../models/Set.model";

export function Exercise(name = "", categories = []) {
	return {
		name,
		categories,
		id: uuidv4(),
		sets: [Set()]
	};
}
