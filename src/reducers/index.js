import loggedReducer from "./logged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
	logged: loggedReducer
});

export default allReducers;
