import { v4 as uuidv4 } from "uuid";
import { Set } from "../models/Set";

export class Exercise {
	constructor(name, categories) {
		this.name = name;
		this.category = categories;
		this.id = uuidv4();
		this.sets = [new Set()];
	}
}
