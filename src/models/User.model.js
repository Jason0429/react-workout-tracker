import { exercises } from "../data/exercises";

export function User(profileObj) {
	return {
		email: profileObj.email,
		familyName: profileObj.familyName,
		givenName: profileObj.givenName,
		googleId: profileObj.googleId,
		imageUrl: profileObj.imageUrl,
		name: profileObj.name,
		workouts: [],
		templates: [],
		exercises
	};
}
