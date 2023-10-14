import React from "react";
import { useAppContext } from "../../context/Provider";
function CandidateMove() {
	const { appState } = useAppContext();

	// console.log(currentPosition, "current position");
	return (
		<div className="candidate_move">
			<table>
				<thead>
					<th>TURN</th>
				</thead>
				<tr>
					<td>{appState.turn}</td>
					{/*<td>{appState.candidateMove.map((el) => {
						return (
							<br />
							<span></span>
					)
				})}</td> */}
				</tr>
			</table>
		</div>
	);
}

export default CandidateMove;
