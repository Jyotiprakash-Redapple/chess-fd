/**
 * rook move rule
 */
let getRookMoves = ({ position, rank, file, piece }) => {
	let move = [];
	let us = piece[0];
	let enemy = us === "w" ? "b" : "w";

	let direction = [
		[-1, 0],
		[0, 1],
		[0, -1],
		[1, 0],
	];

	direction.forEach((dir) => {
		for (let i = 1; i < 8; i++) {
			let xmoves = i * dir[0];
			let ymoves = i * dir[1];
			const x = rank + xmoves;
			const y = file + ymoves;

			if (position?.[x]?.[y] === undefined) {
				return;
			}
			const cellValue = position[x][y];
			const isEnemy = cellValue.startsWith(enemy);
			const isUs = cellValue.startsWith(us);

			if (isEnemy) {
				move.push([x, y]);
				return;
			} else {
				if (isUs) {
					return;
				} else {
					move.push([x, y]);
				}
			}
		}
	});

	return move;
};
/**
 * knight move rule
 */
let getKnightMoves = ({ position, rank, file }) => {
	const moves = [];
	const enemy = position[rank][file].startsWith("w") ? "b" : "w";

	const candidates = [
		[-2, -1],
		[-2, 1],
		[-1, -2],
		[-1, 2],
		[1, -2],
		[1, 2],
		[2, -1],
		[2, 1],
	];
	candidates.forEach((c) => {
		const cell = position?.[rank + c[0]]?.[file + c[1]];
		if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
			moves.push([rank + c[0], file + c[1]]);
		}
	});
	return moves;
};

/**
 * bishop move rule
 */

let getBishopMoves = ({ position, piece, rank, file }) => {
	const moves = [];
	const us = piece[0];
	const enemy = us === "w" ? "b" : "w";

	const direction = [
		[-1, -1],
		[-1, 1],
		[1, -1],
		[1, 1],
	];

	direction.forEach((dir) => {
		for (let i = 1; i <= 8; i++) {
			const x = rank + i * dir[0];
			const y = file + i * dir[1];
			if (position?.[x]?.[y] === undefined) break;
			if (position[x][y].startsWith(enemy)) {
				moves.push([x, y]);
				break;
			}
			if (position[x][y].startsWith(us)) {
				break;
			}
			moves.push([x, y]);
		}
	});
	return moves;
};
/**
 * queen move rule
 */
let getQueenMoves = ({ position, piece, rank, file }) => {
	const moves = [
		...getBishopMoves({ position, piece, rank, file }),
		...getRookMoves({ position, piece, rank, file }),
	];

	return moves;
};

/**
 * king move rule
 */
let getKingMoves = ({ position, piece, rank, file }) => {
	let moves = [];
	const us = piece[0];
	const direction = [
		[1, -1],
		[1, 0],
		[1, 1],
		[0, -1],
		[0, 1],
		[-1, -1],
		[-1, 0],
		[-1, 1],
	];

	direction.forEach((dir) => {
		const x = rank + dir[0];
		const y = file + dir[1];
		if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us))
			moves.push([x, y]);
	});
	return moves;
};

/**
 * pawn move rule
 */
let getPawnMoves = ({ position, piece, rank, file }) => {
	const moves = [];
	const dir = piece === "wp" ? 1 : -1;

	// Move two tiles on first move
	if (rank % 5 === 1) {
		if (
			position?.[rank + dir]?.[file] === "" &&
			position?.[rank + dir + dir]?.[file] === ""
		) {
			moves.push([rank + dir + dir, file]);
		}
	}

	// Move one tile
	if (!position?.[rank + dir]?.[file]) {
		moves.push([rank + dir, file]);
	}

	return moves;
};

/**
 * pawn capture rule
 */
let getPawnCapture = ({ position, prevPosition, piece, rank, file }) => {
	const moves = [];
	const dir = piece === "wp" ? 1 : -1;
	const enemy = piece[0] === "w" ? "b" : "w";

	// Capture enemy to left
	if (
		position?.[rank + dir]?.[file - 1] &&
		position[rank + dir][file - 1].startsWith(enemy)
	) {
		moves.push([rank + dir, file - 1]);
	}

	// Capture enemy to right
	if (
		position?.[rank + dir]?.[file + 1] &&
		position[rank + dir][file + 1].startsWith(enemy)
	) {
		moves.push([rank + dir, file + 1]);
	}

	// EnPassant
	// Check if enemy moved twice in last round
	const enemyPawn = dir === 1 ? "bp" : "wp";
	const adjacentFiles = [file - 1, file + 1];
	if (prevPosition) {
		console.log("function calll");
		if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
			adjacentFiles.forEach((f) => {
				if (
					position?.[rank]?.[f] === enemyPawn &&
					position?.[rank + dir + dir]?.[f] === "" &&
					prevPosition?.[rank]?.[f] === "" &&
					prevPosition?.[rank + dir + dir]?.[f] === enemyPawn
				) {
					moves.push([rank + dir, f]);
				}
			});
		}
	}
	return moves;
};

export {
	getRookMoves,
	getKingMoves,
	getKnightMoves,
	getQueenMoves,
	getPawnMoves,
	getBishopMoves,
	getPawnCapture,
};
