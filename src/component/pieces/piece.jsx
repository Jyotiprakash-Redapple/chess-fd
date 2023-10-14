import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/Provider";

import { arbitar } from "../../arbitar/arbitar";

import { makeCandidateMoves, makeNewClickMove } from "../../reducer/move";
function piece({ rank, file, piece }) {
	const { appState, dispatch } = useAppContext();

	const currentPosition = appState.position[appState.position.length - 1];

	/**
	 * move function
	 */

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
		if (appState.turn === piece[0]) {
			const candicateMove = arbitar.getValidMoves({
				position: currentPosition,
				prevPosition: appState.position[appState.position.length - 2],
				castelDirection: appState.castlingdir[appState.turn],
				rank,
				file,
				piece,
			});

			dispatch(makeCandidateMoves({ candicateMove }));
		}
	};

	const handelDargEnd = (e) => {
		e.target.style.display = "block";
	};

	/**
	 * click event handel
	 */
	const handelClick = (e) => {
		// check my turn
		if (appState.turn === piece[0]) {
			const candicateMove = arbitar.getValidMoves({
				position: currentPosition,
				prevPosition: appState.position[appState.position.length - 2],
				castelDirection: appState.castlingdir[appState.turn],
				rank,
				file,
				piece,
			});

			dispatch(makeNewClickMove({ porn: `${piece},${rank},${file}` }));
			dispatch(makeCandidateMoves({ candicateMove }));
		}
	};

	//! remove current div class toogle
	return (
		<div
			className={`piece ${piece} p-${file}${rank}`}
			draggable={true}
			onDragStart={handelDragStart}
			onDragEnd={handelDargEnd}
			onClick={handelClick}></div>
	);
}

export default piece;
