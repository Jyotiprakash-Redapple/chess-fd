import React from "react";
import { gameStatus } from "../../reducer/constant";
import { newGameStart } from "../../reducer/move";
import { useAppContext } from "../../context/Provider";
function satalement() {
	const {
		appState: { status },
		dispatch,
	} = useAppContext();

	if (status === gameStatus.ongoing || status === gameStatus.promoting)
		return null;

	const newGame = () => {
		dispatch(newGameStart());
	};

	const isWin = status.endsWith("wins");

	return (
		<div className='popup--inner popup--inner__center'>
			<h1>{isWin ? status : "Draw"}</h1>
			<p>{!isWin && status}</p>
			<div className={`${status}`} />
			<button className='new_game_btn' onClick={newGame}>
				New Game
			</button>
		</div>
	);
}

export default satalement;
