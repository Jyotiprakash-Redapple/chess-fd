import { copyPosition } from "../helper/helper";

let isPawnMove = ({ position, piece, rank, file, x, y }) => {
	const newPosition = copyPosition(position);
	if (!newPosition[x][y] && x !== rank && y !== file) {
		newPosition[rank][y] = "";
	}
	newPosition[Number(rank)][Number(file)] = "";

	newPosition[x][y] = piece;

	return newPosition;
};

let isNotPawnMove = ({ position, piece, rank, file, x, y }) => {
	const newPosition = copyPosition(position);

	newPosition[Number(rank)][Number(file)] = "";

	newPosition[x][y] = piece;

	return newPosition;
};
export { isNotPawnMove, isPawnMove };
