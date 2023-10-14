import {
	getRookMoves,
	getKingMoves,
	getKnightMoves,
	getQueenMoves,
	getPawnMoves,
	getBishopMoves,
	getPawnCapture,
} from "./getMoves";

import { isPawnMove, isNotPawnMove } from "./move";
let arbitar = {
	getRegularMove: function ({ position, rank, file, piece }) {
		if (piece.endsWith("n")) return getKnightMoves({ position, rank, file });
		if (piece.endsWith("b"))
			return getBishopMoves({ position, piece, rank, file });
		if (piece.endsWith("r"))
			return getRookMoves({ position, piece, rank, file });
		if (piece.endsWith("q"))
			return getQueenMoves({ position, piece, rank, file });
		if (piece.endsWith("k"))
			return getKingMoves({ position, piece, rank, file });
		if (piece.endsWith("p"))
			return [...getPawnMoves({ position, piece, rank, file })];
	},

	getValidMoves: function ({ position, prevPosition, piece, rank, file }) {
		let moves = this.getRegularMove({ position, piece, rank, file });
		const notInCheckMoves = [];

		if (piece.endsWith("p")) {
			moves = [
				...moves,
				...getPawnCapture({ position, prevPosition, piece, rank, file }),
			];
		}

		return moves;
	},

	// check is pawn or
	checkAmove: function ({ position, piece, rank, file, x, y }) {
		const isPawn = piece.endsWith("p");
		if (isPawn) {
			return isPawnMove({ position, piece, rank, file, x, y });
		} else {
			return isNotPawnMove({ position, piece, rank, file, x, y });
		}
	},
};

export { arbitar };
