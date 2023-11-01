import React, { useEffect } from "react";
import Board from "../../component/board/board";
import { useNavigate } from "react-router-dom";
import appConfig from "../../appconfig/appconfig";
import { useAppContext } from "../../context/Provider";
import Controls from "../../component/controls/controls";
import Movelist from "../../component/controls/movelist";
import userAvatar from "../../assets/app/search_avatar/avatar1.jpg";
import opponetAvatar from "../../assets/app/search_avatar/avatar2.jpg";
import ProfileBorder from "../../assets/app/profile_border.png";
import Timer from "../../assets/app/lottie/Timer.gif";
function chessBoard() {
	const { appState, dispatch } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the socket is not connected.
		if (!appState.socket) {
			navigate("/", {
				replace: true,
			});
		} else {
			appState.socket.getUpdateDetailsFromServer(dispatch);
		}
	}, [appState.socket, dispatch, navigate]);

	return (
		<div className='board_container'>
			<div className='sidebar_suggestion'>
				{" "}
				<div class='row my-3 text-align-center'>
					<div class='col-md-12'>
						<h2>Advantage</h2>
						<p>
							<span id='advantageColor'>Neither side</span> has the advantage (+
							<span id='advantageNumber'>0</span>).
						</p>
						<div class='progress'>
							<div
								class='progress-bar bg-primary progress-bar-striped progress-bar-animated'
								role='progressbar'
								aria-valuenow='0'
								style={{ width: "50%" }}
								aria-valuemin='-2000'
								aria-valuemax='4000'
								id='advantageBar'></div>
						</div>
					</div>
				</div>
				<div class='row my-3 text-align-center'>
					<div class='col-md-12'>
						<h2>Status</h2>
						<p>
							<span id='status'>{appState.status}</span>
						</p>
					</div>
				</div>
			</div>
			{appState.socket ? (
				<>
					<div
						className='boards'
						style={{
							transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
						}}>
						<div className='self_profile'>
							<div
								className='user_profile'
								style={{
									transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,

									border: appState.turn === "w" ? "10px solid green" : "0px",
									borderRadius: "100%",
								}}>
								<img
									src={userAvatar}
									alt={``}
									style={{
										position: "absolute",
										width: "60px",
										height: "60px",
										borderRadius: "100px",
									}}
								/>
								<img
									src={ProfileBorder}
									alt={``}
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										borderRadius: "100px",
									}}
								/>

								{/* {appState.turn === "w" ? (
									<img
										src={Timer}
										alt={``}
										style={{
											position: "absolute",
											width: "100%",
											height: "100%",

											borderRadius: "100%",
										}}
									/>
								) : (
									<></>
								)} */}
							</div>
							{appState.opponent === "b" ? (
								<div className='user_kill'>
									<div className='pawn_pices'>
										{appState.kill_pices.map((el, idx) => {
											console.log(el, "el");
											if (el) {
												if (el[0] === appState.opponent) {
													if (el[1] === "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
									<div className='master_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] === appState.opponent) {
													if (el[1] !== "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
								</div>
							) : (
								<div className='user_kill'>
									<div className='pawn_pices'>
										{appState.kill_pices.map((el, idx) => {
											console.log(el, "el");
											if (el) {
												if (el[0] !== appState.opponent) {
													if (el[1] === "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
									<div className='master_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] !== appState.opponent) {
													if (el[1] !== "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
								</div>
							)}
						</div>
						<div className='opponet_profile'>
							{appState.opponent === "b" ? (
								<div className='user_kill'>
									{" "}
									<div className='pawn_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] !== appState.opponent) {
													if (el[1] === "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
									<div className='master_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] !== appState.opponent) {
													if (el[1] !== "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
								</div>
							) : (
								<div className='user_kill'>
									{" "}
									<div className='pawn_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] === appState.opponent) {
													if (el[1] === "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
									<div className='master_pices'>
										{appState.kill_pices.map((el, idx) => {
											if (el) {
												if (el[0] === appState.opponent) {
													if (el[1] !== "p") {
														return (
															<div key={idx}>
																<img
																	src={appConfig.pices[el]}
																	style={{
																		width: "30px",
																		height: "30px",
																		transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
																	}}
																/>
															</div>
														);
													}
												}
											}
										})}
									</div>
								</div>
							)}

							<div
								className='user_profile'
								style={{
									transform: appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
									border: appState.turn === "b" ? "10px solid green" : "0px",
									borderRadius: "100%",
								}}>
								<img
									src={opponetAvatar}
									alt={``}
									style={{
										position: "absolute",
										width: "60px",
										height: "60px",
										borderRadius: "100px",
									}}
								/>
								<img
									src={ProfileBorder}
									alt={``}
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										borderRadius: "100px",
									}}
								/>
								{/* {appState.turn === "b" ? (
									<img
										src={Timer}
										alt={``}
										style={{
											position: "absolute",
											width: "100%",
											height: "100%",

											borderRadius: "100%",
										}}
									/>
								) : (
									<></>
								)} */}
							</div>
						</div>

						<Board />
					</div>
					<Controls>
						<Movelist />
					</Controls>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default chessBoard;
