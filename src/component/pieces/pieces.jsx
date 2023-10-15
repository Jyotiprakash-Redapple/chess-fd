import React, { useRef } from "react";
import Piece from "./piece";

import { copyPosition } from "../../helper/helper";
import { useAppContext } from "../../context/Provider";

import {
	makeNewMove,
	clearCandidates,
	clearPorn,
	openPromotionBox,
	updateCastlingMove,
	dectactStalemet,
} from "../../reducer/move";
import { arbitar } from "../../arbitar/arbitar";
import { getCastlingDir } from "../../arbitar/getMoves";
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
	 * open promotion box
	 */

	const handelOpenPromotionBox = ({ rank, file, x, y }) => {
		dispatch(
			openPromotionBox({ rank: Number(rank), file: Number(file), x, y })
		);
	};

	/**
	 * handel updated castling move
	 */

	const updateCastlingDir = ({ piece, rank, file }) => {
		const dir = getCastlingDir({
			castelDirection: appState.castlingdir,
			piece,
			rank,
			file,
		});
		if (dir) {
			dispatch(updateCastlingMove(dir));
		}
	};
	/**
	 * drop event handel
	 */
	const handelDrop = (e) => {
		const { x, y } = calculateCoords(e);

		const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

		if (appState.candidateMove.find((m) => m[0] === x && m[1] === y)) {
			// Em pasant move when current poition empty

			if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
				handelOpenPromotionBox({ rank, file, x, y });
				return;
			}
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
			const { x, y } = calculateCoords(e);

			const [piece, rank, file] = appState.porn.split(",");

			if (appState.candidateMove.find((m) => m[0] === x && m[1] === y)) {
				// Em pasant move when current poition empty

				const opponet = piece.startsWith("w") ? "b" : "w";
				const castelDirection =
					appState.castlingdir[`${piece.startsWith("w") ? "b" : "w"}`];
				if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
					handelOpenPromotionBox({ rank, file, x, y });
					return;
				}

				if (piece.endsWith("k") || piece.endsWith("r")) {
					updateCastlingDir({ piece, rank, file });
				}
				const newPosition = arbitar.checkAmove({
					position: currentPosition,
					x,
					y,
					rank,
					file,
					piece,
				});

				dispatch(makeNewMove({ newPosition }));

				if (arbitar.isStalemate(newPosition, opponet, castelDirection)) {
					dispatch(dectactStalemet());
				}
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
