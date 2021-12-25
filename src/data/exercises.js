import { Exercise } from "../models/Exercise";

const CHEST = "Chest";
const SHOULDERS = "Shoulders";
const TRICEPS = "Triceps";
const BICEPS = "Biceps";
const LEGS = "Legs";
const BACK = "Back";
const FULL_BODY = "Full Body";

export const exercises = [
	new Exercise("Bench Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Incline Bench Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Decline Bench Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Incline Dumbbell Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Flat Dumbbell Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Decline Dumbbell Press", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Dips", [CHEST, SHOULDERS, TRICEPS]),
	new Exercise("Overhead Barbell Press", [SHOULDERS, TRICEPS]),
	new Exercise("Upright Row", [SHOULDERS, TRICEPS]),
	new Exercise("Dumbbell Shoulder Press", [SHOULDERS, TRICEPS]),
	new Exercise("Lateral Raises", [SHOULDERS]),
	new Exercise("Front Raises", [SHOULDERS]),
	new Exercise("Face Pulls", [SHOULDERS]),
	new Exercise("Tricep Extensions", [TRICEPS]),
	new Exercise("Overhead Tricep Extensions", [TRICEPS]),
	new Exercise("Dumbbell Fly", [CHEST]),
	new Exercise("Machine Fly", [CHEST]),
	new Exercise("Dumbbell Pullover", [CHEST]),
	new Exercise("Lat Pulldown", [BACK, BICEPS]),
	new Exercise("High Row Machine", [BACK, BICEPS]),
	new Exercise("Cable Rows", [BACK, BICEPS]),
	new Exercise("Dumbbell Rows", [BACK, BICEPS]),
	new Exercise("One-Arm Dumbbell Rows", [BACK, BICEPS]),
	new Exercise("Cable Curls", [BICEPS]),
	new Exercise("Dumbbell Curls", [BICEPS]),
	new Exercise("Spider Curls", [BICEPS]),
	new Exercise("Barbell Squat", [LEGS]),
	new Exercise("Goblet Squat", [LEGS]),
	new Exercise("Dumbbell Squat", [LEGS]),
	new Exercise("Conventional Deadlift", [LEGS]),
	new Exercise("Sumo Deadlift", [LEGS]),
	new Exercise("Romanian Deadlift", [LEGS]),
	new Exercise("Leg Press", [LEGS]),
	new Exercise("Leg Extension", [LEGS]),
	new Exercise("Leg Curls", [LEGS]),
	new Exercise("Calf Raises", [LEGS]),
	new Exercise("Burpees", [FULL_BODY])
];
