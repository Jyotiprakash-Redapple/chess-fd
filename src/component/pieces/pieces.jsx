import React, { useRef } from "react";
import Piece from "./piece";

import { copyPosition } from "../../helper/helper";
import { useAppContext } from "../../context/Provider";

import { makeNewMove, clearCandidates, clearPorn } from "../../reducer/move";
import { arbitar } from "../../arbitar/arbitar";
function pices() {
	const { appState, dispatch } = useAppContext();
	const currentPosition = appState.position[appState.position.length - 1];

	const picesRef = useRef();

	/**
	 * get coordinate of parent virtual board
	 */
	const calculateCoords = (e) => {
		const { top, left, width } = picesRef.current.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);

		return { x, y };
	};
	/**
	 * drop event handel
	 */
	const handelDrop = (e) => {
		const { x, y } = calculateCoords(e);

		const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

		console.log(appState.candidateMove, "candidate move");
		if (appState.candidateMove.find((m) => m[0] === x && m[1] === y)) {
			// Em pasant move when current poition empty

			const newPosition = arbitar.checkAmove({
				position: currentPosition,
				x,
				y,
				rank,
				file,
				piece,
			});

			dispatch(makeNewMove({ newPosition }));
		}
		dispatch(clearCandidates());
		dispatch(clearPorn());
	};

	/**
	 * darg over event handel
	 */
	const handeldargOver = (e) => {
		e.preventDefault();
	};

	/**
	 * drop click event handel
	 */
	const handelDropClick = (e) => {
		if (appState.porn) {
			const newPosition = copyPosition(currentPosition);
			const { x, y } = calculateCoords(e);

			const [p, rank, file] = appState.porn.split(",");

			if (appState.candidateMove.find((m) => m[0] === x && m[1] === y)) {
				newPosition[Number(rank)][Number(file)] = "";

				newPosition[x][y] = p;

				dispatch(makeNewMove({ newPosition }));
			}
			dispatch(clearCandidates());
			dispatch(clearPorn());
		}
	};
	return (
		<>
			<div
				className="pieces"
				ref={picesRef}
				onClick={handelDropClick}
				onDrop={handelDrop}
				onDragOver={handeldargOver}>
				{currentPosition.map((r, rank) =>
					r.map((f, file) =>
						currentPosition[rank][file] ? (
							<Piece
								key={rank + "-" + file}
								rank={rank}
								file={file}
								piece={currentPosition[rank][file]}
							/>
						) : null
					)
				)}
			</div>
		</>
	);
}

export default pices;
