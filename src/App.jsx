import { Suspense, useState, useEffect } from "react";
import appConfig from "./appconfig/appconfig";
import Board from "../src/screen/board/chessBoard";
import AIboard from "./screen/board/AIboard";
import Lunch from "./screen/game/lunch";
import Home from "../src/screen/home/home";
import { Routes, Route } from "react-router-dom";
import Client from "./client/client";
import { newSocketConnect } from "./reducer/move";
import { useAppContext } from "../src/context/Provider";
import Loading from "./assets/app/lottie/loading.json";
function Fallback() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Loading />
		</div>
	);
}

function AuthGaurd() {
	const [query, setQuery] = useState(null);

	const { dispatch } = useAppContext();
	useEffect(() => {
		const search = window.location.search;
		if (search) {
			const searchParams = new URLSearchParams(search);
			const queryVar = searchParams.get("auth_token");

			if (queryVar) {
				setQuery(queryVar);
				const client = new Client();
				dispatch(newSocketConnect({ socket: client }));
				localStorage.setItem(appConfig.localStorageAuth, JSON.stringify(queryVar));
			} else {
				console.log(
					"%cEmpty Query Param",
					"background-color: green; color: red; font-size: larger; font-weight: 700"
				);
			}
		} else {
			console.log(
				"%cAuthentication Faild",
				"background-color: white; color: red; font-size: larger; font-weight: 700"
			);
		}
	}, []);

	if (query) {
		return <Home />;
	}

	return (
		<>
			<section className='page_404'>
				<div className='container'>
					<div className='row'>
						<div className='col-sm-12 '>
							<div className='col-sm-10 col-sm-offset-1  text-center'>
								<div className='four_zero_four_bg'>
									<h1 className='text-center '>404</h1>
								</div>

								<div className='contant_box_404'>
									<h3 className='h2'>Look like you're lost</h3>

									<p>You are not authorized to play game !</p>

									<a href='' className='link_404'>
										Authentication Faild
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
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
