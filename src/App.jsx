import { Suspense, useState, useEffect } from "react";
import appConfig from "./appconfig/appconfig";
import Board from "../src/screen/board/chessBoard";
import AIboard from "./screen/board/AIboard";
import Lunch from "./screen/game/lunch";
import Home from "../src/screen/home/home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Client from "./client/client";
import { newSocketConnect } from "./reducer/move";
import { useAppContext } from "../src/context/Provider";
import Loading from "./assets/app/lottie/loading.json";
import Login from "./screen/auth/login/Login";
import Lottie from "react-lottie";
function Fallback() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: Loading,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#D3D3D3",
			}}>
			<Lottie options={defaultOptions} height={400} width={400} />
		</div>
	);
}

function AuthGaurd() {
	const [query, setQuery] = useState(null);
	const navigate = useNavigate();
	const { dispatch } = useAppContext();
	useEffect(() => {
		const search = window.location.search;
		if (search) {
			const searchParams = new URLSearchParams(search);

			if (searchParams.get("auth_token")) {
				let queryVar = searchParams.get("auth_token");

				setQuery("auth_token");
				const client = new Client();
				dispatch(newSocketConnect({ socket: client }));
				localStorage.setItem(appConfig.localStorageAuth, queryVar);
			} else {
				if (searchParams.get("mode")) {
					let queryVar = searchParams.get("mode");
					setQuery(queryVar);
				}
			}
		} else {
			console.log(
				"%cAuthentication Faild",
				"background-color: white; color: red; font-size: larger; font-weight: 700"
			);
		}
	}, []);

	if (query === appConfig.mode) {
		navigate("/play-game-ai", { replace: true });
	}

	return <>{query === "auth_token" ? <Home /> : <Fallback />}</>;
}

function App() {
	return (
		<div className='app'>
			<Suspense fallback={<Fallback />}>
				<Routes>
					<Route path='/' element={<AuthGaurd />} />
					<Route path='/game-lunch' element={<Lunch />} />
					<Route path='/play-game' element={<Board />} />
					<Route path='/play-game-ai' element={<AIboard />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
