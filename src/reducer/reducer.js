import { actionTypes } from "./constant";
let reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.NEW_MOVE: {
			const turn = state.turn === "w" ? "b" : "w";
			const newposition = [...state.position, action.payload.newPosition];
			return {
				...state,
				turn,
				position: newposition,
			};
		}
		case actionTypes.CANDIDATE_MOVE: {
			return {
				...state,
				candidateMove: action.payload.candicateMove,
			};
		}
		default: {
			state;
			break;
		}
	}
};

export { reducer };
