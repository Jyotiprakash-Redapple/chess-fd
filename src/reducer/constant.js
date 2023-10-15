import { createPosition } from "../helper/helper";

let gameStatus = {
	stalemet: "game draw due to stalemet",
	insufficiant: "game draw due to in sufficiant matarial",
	ongoing: "ongoing",
	draw: "draw",
	promoting: "promoting",
	white: "white wins",
	black: "black wins",
};
let initGame = {
	position: [createPosition()],
	turn: "w",
	candidateMove: [],
	porn: "",
	status: gameStatus.ongoing,
	promotion: null,
	castlingdir: {
		w: "both",
		b: "both",
	},
};
Object.freeze(initGame);

let actionTypes = {
	NEW_MOVE: "NEW_MOVE",
	NEW_MOVE_CLICK_PORN: "NEW_MOVE_CLICK_PORN",
	CLEAR_PORN: "CLEAR_PORN",
	CANDIDATE_MOVE: "CANDIDATE_MOVE",
	CLEAR_CANDIDATE_MOVES: "CLEAR_CANDIDATE_MOVES",
	OPEN_PROMOTION_BOX: "OPEN_PROMOTION_BOX",
	CLOSE_PROMOTION_BOX: "CLOSE_PROMOTION_BOX",
	CHECK_CASTEL: "CHECK_CASTEL",
	DECTACT_STALEMET: "DECTACT_STALEMET",
	DECTACT_INSUFFICIANT_MATARIAL: "DECTACT_INSUFFICIANT_MATARIAL",
	NEW_GAME: "NEW_GAME",
};
export { initGame, actionTypes, gameStatus };
