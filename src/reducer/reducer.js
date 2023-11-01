import { actionTypes, gameStatus } from "./constant";

import { createPosition } from "../helper/helper";
let reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.NEW_GAME_INIT: {
			console.log(action.payload.arg);
			const player = action.payload.arg.player;
			let gameInit = {
				opponent: player.colour === "white" ? "b" : "w",
				position: player.colour === "white" ? [createPosition()] : [createPosition()],
				turn: "w",
				status: gameStatus.ongoing,
			};

			return {
				...state,
				opponent: gameInit.opponent,
				position: gameInit.position,
				turn: gameInit.turn,
				status: gameInit.status,
				pl: action.payload.arg.player,
				op: action.payload.arg.opponent,
			};
		}
		case actionTypes.BOARD_UPDATE: {
			let board = action.payload.arg.board;

			if (board.turn !== state.opponent) {
				if (board?.status) {
					return {
						...state,
						status: board.status,
					};
				} else {
					const newposition = [...state.position, board.position];

					return {
						...state,
						position: newposition,
						turn: board.turn,
						moveList: [...board.moveList],
						kill_pices: [...board.kill_pices],
						castlingdir: board.castlingDirection,
					};
				}
			} else {
				return {
					...state,
				};
			}
		}

		case actionTypes.NEW_MOVE: {
			//! move list empty  || if move list not empty check last index two size or not
			//! if last index two size push an element other wise pus new arr

			let newMoveList = [];

			if (!state.moveList.length) {
				newMoveList = [[action.payload.newMove]];
			} else {
				let lastMove = state.moveList[state.moveList.length - 1];

				if (lastMove.length !== 2) {
					newMoveList = [...state.moveList];
					newMoveList[state.moveList.length - 1] = [lastMove[0], action.payload.newMove];
				} else {
					newMoveList = [...state.moveList, [action.payload.newMove]];
				}
			}

			const turn = state.turn === "w" ? "b" : "w";
			const newposition = [...state.position, action.payload.newPosition];

			state.socket.onUpdateMove({
				position: action.payload.newPosition,
				turn,
				moveList: newMoveList,
				kill_pices: state.kill_pices,
				castlingDirection: state.castlingdir,
			});
			return {
				...state,
				turn,
				position: newposition,
				moveList: newMoveList,
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
		case actionTypes.CLEAR_PIECES_SQOURE_INFO: {
			return {
				...state,
				pieces_square_info: action.payload,
			};
		}
		case actionTypes.PIECES_SQOURE_INFO: {
			return {
				...state,
				pieces_square_info: action.payload.pieces_square_info,
			};
		}
		case actionTypes.OPEN_PROMOTION_BOX: {
			return {
				...state,
				status: gameStatus.promoting,
				promotion_square_info: action.payload,
			};
		}

		case actionTypes.CLOSE_PROMOTION_BOX: {
			return {
				...state,
				status: gameStatus.ongoing,
			};
		}

		case actionTypes.CLEAR_PROMOTION_SQOUR_INFO: {
			return {
				...state,

				promotion_square_info: null,
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
			state.socket.onUpdateMove({
				status: gameStatus.stalemet,
			});
			state.socket.onUpdateWin({
				player: { id: state.pl.id, score: 0.5, colour: state.pl.colour },
				opponent: { id: state.op.id, score: 0.5, colour: state.op.colour },
				winner: gameStatus.stalemet,
			});

			return {
				...state,
				status: gameStatus.stalemet,
			};
		}

		case actionTypes.DECTACT_INSUFFICIANT_MATARIAL: {
			state.socket.onUpdateMove({
				status: gameStatus.insufficiant,
			});
			state.socket.onUpdateWin({
				player: { id: state.pl.id, score: 0.5, colour: state.pl.colour },
				opponent: { id: state.op.id, score: 0.5, colour: state.op.colour },
				winner: gameStatus.insufficiant,
			});

			return {
				...state,
				status: gameStatus.insufficiant,
			};
		}
		case actionTypes.WIN: {
			state.socket.onUpdateMove({
				status: action.payload === "w" ? gameStatus.white : gameStatus.black,
			});
			state.socket.onUpdateWin({
				player: {
					id: state.pl.id,
					score: state.pl.colour[0] === action.payload ? 1 : 0,
					colour: state.pl.colour,
				},
				opponent: {
					id: state.op.id,
					score: state.pl.colour[0] === action.payload ? 0 : 1,
					colour: state.op.colour,
				},
				winner:
					state.pl.colour[0] === action.payload ? state.pl.colour : state.op.colour,
			});

			return {
				...state,
				status: action.payload === "w" ? gameStatus.white : gameStatus.black,
			};
		}
		case actionTypes.SAVE_KILL_PICES: {
			let prevPosition = action.payload.prevPosition;
			let x = action.payload.x;
			let y = action.payload.y;
			let enemy = prevPosition?.[x]?.[y] ? prevPosition[x][y] : null;
			return {
				...state,
				kill_pices: [...state.kill_pices, enemy],
			};
		}

		case actionTypes.NEW_GAME: {
			return {
				...action.payload,
			};
		}

		// socket
		case actionTypes.NEW_SOCKET_CONNECTION: {
			return {
				...state,
				socket: action.payload.socket,
			};
		}

		default: {
			state;
			break;
		}
	}
};

export { reducer };

// active
// :
// false
// opponent
// :
// {id: 6, user_name: 'Test0', score: 0, colour: 'black'}
// player
// :
// {id: 7, user_name: 'Test1', score: 0, colour: 'white'}
// turn
// :
// true
// turn_time
// :
// 60
