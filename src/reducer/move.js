import { actionTypes, initGame } from "./constant";
/**
 * make new move with darg and drop
 */
let makeNewMove = ({ newPosition, newMove }) => {
	return {
		type: actionTypes.NEW_MOVE,
		payload: { newPosition, newMove },
	};
};

/**
 * set which sqoure user pickup
 */

let setPicesSqoureInfo = ({ pieces_square_info }) => {
	return {
		type: actionTypes.PIECES_SQOURE_INFO,
		payload: {
			pieces_square_info,
		},
	};
};

/**
 * suggestion when new move happen click || drag
 */
let makeCandidateMoves = ({ candicateMove }) => {
	return {
		type: actionTypes.CANDIDATE_MOVE,
		payload: { candicateMove },
	};
};

/**
 * clear suggestion candiateMove array
 */
let clearCandidates = () => {
	return {
		type: actionTypes.CLEAR_CANDIDATE_MOVES,
		payload: [],
	};
};

/**
 * clear previous sqoure info suggestion
 */
let clearPicesSqoureInfo = () => {
	return {
		type: actionTypes.CLEAR_PIECES_SQOURE_INFO,
		payload: "",
	};
};

/**
 * open promotion box if any pawn at last position
 */
let openPromotionBox = ({ rank, file, x, y }) => {
	return {
		type: actionTypes.OPEN_PROMOTION_BOX,
		payload: { rank, file, x, y },
	};
};
/**
 * close promotion box after any one click
 */
let closePromotionBox = () => {
	return {
		type: actionTypes.CLOSE_PROMOTION_BOX,
		payload: {},
	};
};

/**
 * close promotion box after any one click
 */
let clearPromotionSqourInfo = () => {
	return {
		type: actionTypes.CLEAR_PROMOTION_SQOUR_INFO,
		payload: {},
	};
};

/**
 * castling move update according to movement of rook and king intially both
 */
let updateCastlingMove = (direction) => {
	return {
		type: actionTypes.CHECK_CASTEL,
		payload: direction,
	};
};

/**
 * dectate any stalemet every time
 */
let dectactStalemet = () => {
	return {
		type: actionTypes.DECTACT_STALEMET,
	};
};

/**
 * dectate any insufficient mating material
 */
let dectactInSufficiantMatarial = () => {
	return {
		type: actionTypes.DECTACT_INSUFFICIANT_MATARIAL,
	};
};

/**
 * dectate chackmate
 */
let dectactCheckmate = (winner) => {
	return {
		type: actionTypes.WIN,
		payload: winner,
	};
};

/**
 * new game start
 */
let newGameStart = () => {
	return {
		type: actionTypes.NEW_GAME,
		payload: {
			initGame,
		},
	};
};

/**
 * save kill pices
 */

let saveKillPices = ({ prevPosition, x, y }) => {
	return {
		type: actionTypes.SAVE_KILL_PICES,
		payload: { prevPosition, x, y },
	};
};
/**
 * socket connect
 */

let newSocketConnect = ({ socket }) => {
	return {
		type: actionTypes.NEW_SOCKET_CONNECTION,
		payload: { socket },
	};
};
/**
 * new game init
 */

let gameInit = ({ arg }) => {
	return {
		type: actionTypes.NEW_GAME_INIT,
		payload: { arg },
	};
};

/**
 * new game init
 */

let updateBoard = ({ arg }) => {
	return {
		type: actionTypes.BOARD_UPDATE,
		payload: { arg },
	};
};

/**\
 * update advantage
 */

let updateAdvantage = (arg) => {
	return {
		type: actionTypes.UPDATE_ADVANTAGE,
		payload: arg,
	};
};
export {
	makeNewMove,
	makeCandidateMoves,
	clearCandidates,
	setPicesSqoureInfo,
	clearPicesSqoureInfo,
	openPromotionBox,
	closePromotionBox,
	updateCastlingMove,
	dectactStalemet,
	dectactCheckmate,
	newGameStart,
	dectactInSufficiantMatarial,
	clearPromotionSqourInfo,
	saveKillPices,
	newSocketConnect,
	gameInit,
	updateBoard,
	updateAdvantage,
};
