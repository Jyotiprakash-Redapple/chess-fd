import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
	const [token, setToken] = useState(() => {
		const _t = localStorage.getItem("_chessToken");
		if (_t) {
			return _t;
		} else {
			return null;
		}
	});

	const navigate = useNavigate();

	const login = ({ name }) => {
		// api call
	};
	const authValue = {
		token,
		name,
		login,
	};

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
		</>
	);
}

function useAuth() {
	return useContext(AuthContext);
}
export { useAuth };
