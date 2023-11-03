import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./context/Provider.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import AuthProvider from "./context/AuthProvider.jsx";
//costum css
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		{" "}
		<AuthProvider>
			<AppProvider>
				{" "}
				<App />
			</AppProvider>
		</AuthProvider>
	</BrowserRouter>
);
