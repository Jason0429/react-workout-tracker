import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
	user: userReducer
});

export const store = configureStore(
	{
		reducer: rootReducer,
		preloadedState: {}
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
