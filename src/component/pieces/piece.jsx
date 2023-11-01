import React from "react";
import { useAppContext } from "../../context/Provider";

import { arbitar } from "../../arbitar/arbitar";

import {
	makeCandidateMoves,
	setPicesSqoureInfo,
	clearPicesSqoureInfo,
} from "../../reducer/move";
function piece({ rank, file, piece }) {
	const { appState, dispatch } = useAppContext();

	const currentPosition = appState.position[appState.position.length - 1];

	/**
	 * move function
	 */

	const onMove = () => {
		if (appState.opponent !== piece[0] && appState.turn === piece[0]) {
			dispatch(clearPicesSqoureInfo());
			const candicateMove = arbitar.getValidMoves({
				position: currentPosition,
				prevPosition: appState.position[appState.position.length - 2],
				castelDirection: appState.castlingdir[appState.turn],
				rank,
				file,
				piece,
				opponent: appState.opponent,
			});

			dispatch(
				setPicesSqoureInfo({ pieces_square_info: `${piece},${rank},${file}` })
			);
			dispatch(makeCandidateMoves({ candicateMove }));
		}
	};

	/**
	 *  darg event handel
	 */
	const handelDragStart = (e) => {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
		setTimeout(() => {
			e.target.style.display = "none";
		}, 0);

		// take my turn ...
		onMove();
	};

	const handelDragEnd = (e) => {
		e.target.style.display = "block";
	};

	/**
	 * click event handel
	 */
	const handelClick = (e) => {
		onMove();
	};

	return (
		<div
			className={`piece ${piece} p-${appState.opponent}${file}${rank}`}
			draggable={true}
			onDragStart={handelDragStart}
			onDragEnd={handelDragEnd}
			onClick={handelClick}></div>
	);
}

export default piece;
