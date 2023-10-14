import { actionTypes } from "./constant";
let makeNewMove = ({ newPosition }) => {
	return {
		type: actionTypes.NEW_MOVE,
		payload: { newPosition },
	};
};

let makeNewClickMove = ({ porn }) => {
	return {
		type: actionTypes.NEW_MOVE_CLICK_PORN,
		payload: {
			porn,
		},
	};
};
let makeCandidateMoves = ({ candicateMove }) => {
	return {
		type: actionTypes.CANDIDATE_MOVE,
		payload: { candicateMove },
	};
};
let clearCandidates = () => {
	return {
		type: actionTypes.CLEAR_CANDIDATE_MOVES,
		payload: [],
	};
};

let clearPorn = () => {
	return {
		type: actionTypes.CLEAR_PORN,
		payload: "",
	};
};

let openPromotionBox = ({ rank, file, x, y }) => {
	return {
		type: actionTypes.OPEN_PROMOTION_BOX,
		payload: { rank, file, x, y },
	};
};

let closePromotionBox = ({}) => {
	return {
		type: actionTypes.CLOSE_PROMOTION_BOX,
		payload: {},
	};
};
export {
	makeNewMove,
	makeCandidateMoves,
	clearCandidates,
	makeNewClickMove,
	clearPorn,
	openPromotionBox,
	closePromotionBox,
};
