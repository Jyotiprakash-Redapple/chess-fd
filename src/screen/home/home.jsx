import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CRow, CCol, CContainer, CCard, CModal } from "@coreui/react";
import appConfig from "../../appconfig/appconfig";
import { useAppContext } from "../../context/Provider";
function home() {
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();

	const { appState } = useAppContext();

	const handelRandomMatch = () => {
		appState.socket.onRendomMatch();
		navigate(`/game-lunch`, {
			replace: true,
		});
	};
	const handelPlayWithAi = () => {
		navigate(`/play-game-ai`, {
			replace: true,
		});
	};
	return (
		<CContainer className='home_container' fluid>
			<div className='home_wrapper'>
				<CRow className='justify-content-center'>
					<CCol xs='12'>
						<CCard
							style={{
								height: "250px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "transparent",
								border: "none",
								outline: "none",
							}}>
							<div className='play_with_game'>{`PLAY  VS`}</div>
						</CCard>
					</CCol>
					<CCol xs='12'>
						<CCard
							style={{
								height: "250px",
								backgroundColor: "transparent",
								border: "none",
								outline: "none",
							}}>
							<CRow
								className='justify-content-around'
								style={{
									margin: 0,
								}}>
								<CCol xs='4'>
									<button className='play_start_btn' onClick={handelRandomMatch}>
										<span>Player</span>
									</button>
								</CCol>
								<CCol xs='4'>
									<button className='play_start_btn' onClick={handelPlayWithAi}>
										<span>AI</span>
									</button>
								</CCol>
							</CRow>
						</CCard>
					</CCol>
				</CRow>
			</div>
			<CModal
				alignment='center'
				visible={visible}
				onClose={() => setVisible(false)}
				aria-labelledby='VerticallyCenteredExample'>
				<div class='comming_soon_wrapper'>
					<h1>
						coming soon<span class='comming_soon_dot'>.</span>
					</h1>
					<p>we are working hard to finish developement of Player vs AI page</p>
				</div>
			</CModal>
		</CContainer>
	);
}

export default home;
