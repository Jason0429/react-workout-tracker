import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Redux
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// import { applyMiddleware, createStore, compose } from "redux";

// import thunk from "redux-thunk";
// import { reduxFirestore, getFirestore } from "redux-firestore";
// import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
// import config from "./config/firebaseConfig";

ReactDOM.render(
	// <Provider store={store}>
	<App />,
	// </Provider>,
	document.getElementById("root")
);
