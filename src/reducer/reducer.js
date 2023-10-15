import { actionTypes, gameStatus } from "./constant";

let reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.NEW_MOVE: {
			console.log("newPosition", action.payload);
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
		case actionTypes.CLEAR_CANDIDATE_MOVES: {
			return {
				...state,
				candidateMove: action.payload,
			};
		}
		case actionTypes.CLEAR_PORN: {
			return {
				...state,
				porn: action.payload,
			};
		}
		case actionTypes.NEW_MOVE_CLICK_PORN: {
			return {
				...state,
				porn: action.payload.porn,
			};
		}
		case actionTypes.OPEN_PROMOTION_BOX: {
			return {
				...state,
				status: gameStatus.promoting,
				promotion: action.payload,
			};
		}

		case actionTypes.CLOSE_PROMOTION_BOX: {
			return {
				...state,
				status: gameStatus.ongoing,
				promotion: action.payload,
			};
		}
		case actionTypes.CHECK_CASTEL: {
			let { turn, castlingdir } = state;
			castlingdir[turn] = action.payload;
			return {
				...state,
				status: gameStatus.ongoing,
			};
		}

		case actionTypes.DECTACT_STALEMET: {
			return {
				...state,
				status: gameStatus.stalemet,
			};
		}

		case actionTypes.NEW_GAME: {
			return {
				...action.payload,
			};
		}
		default: {
			state;
			break;
		}
	}
};

export { reducer };
