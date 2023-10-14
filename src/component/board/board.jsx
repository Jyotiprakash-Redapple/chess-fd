import React from "react";
import Rank from "./bitter/rank";
import File from "./bitter/file";
import Pieces from "../pieces/pieces";
import CandidateMove from "../candidate/CandidateMove";
import { useAppContext } from "../../context/Provider";

import Pupup from "../../component/promotion/popupbox";
function Board() {
	const { appState } = useAppContext();

	console.log(appState, "app state =====>");
	const currentPosition = appState.position[appState.position.length - 1];

	/**
	 * get class dynamically
	 */
	const getClassName = (i, j) => {
		let c = "tile";
		c += (i + j) % 2 === 0 ? " tile--dark " : " tile--light ";
		if (appState.candidateMove.find((m) => m[0] === i && m[1] === j)) {
			if (currentPosition[i][j]) {
				c += " attacking";
			} else {
				c += " highlight";
			}
		}
		return c;
	};

	/**
	 * rank and file 2d array
	 */
	const ranks = Array(8)
		.fill()
		.map((x, i) => 8 - i);
	const files = Array(8)
		.fill()
		.map((x, i) => i + 1);

	return (
		<div className="container">
			<CandidateMove />
			<div className="boards">
				<Rank rank={ranks} />
				<div className="tiles">
					{ranks.map((rank, i) =>
						files.map((file, j) => (
							<div
								key={file + "" + rank}
								i={i}
								j={j}
								className={`${getClassName(7 - i, j)}`}></div>
						))
					)}
				</div>
				<Pupup />
				<Pieces />
				<File file={files} />
			</div>
		</div>
	);
}

export default Board;
