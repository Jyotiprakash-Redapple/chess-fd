import React from "react";
import { useAppContext } from "../../context/Provider";
import {
	makeNewMove,
	clearCandidates,
	closePromotionBox,
	clearPromotionSqourInfo,
	dectactCheckmate,
	dectactInSufficiantMatarial,
	dectactStalemet,
} from "../../reducer/move";
import { arbitar } from "../../arbitar/arbitar";
import { copyPosition, getNewMoveNotation } from "../../helper/helper";
function promot() {
	const options = ["q", "r", "b", "n"];

	const { appState, dispatch } = useAppContext();

	// console.log(appState, "app state promotion box");
	if (!Object.keys(appState.promotion_square_info).length) {
		return null;
	}

	const color = appState.promotion_square_info.x === 7 ? "w" : "b";
	const getPromotionBoxPosition = () => {
		let style = {
			zIndex: 2,
		};
		if (appState.promotion_square_info.x === 7) {
			style.top = "-12.5%";
		} else {
			style.top = "97.5%";
		}

		if (appState.promotion_square_info.y <= 1) {
			style.left = "0%";
		} else if (appState.promotion_square_info.y >= 5) {
			style.right = "0%";
		} else {
			style.left = `${12.5 * appState.promotion_square_info.y - 20}%`;
		}
		style.transform =
			appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`;

		return style;
	};

	const handelClick = (option) => {
		dispatch(closePromotionBox());
		const opponet = appState.promotion_square_info.x === 7 ? "b" : "w";
		const castelDirection =
			appState.castlingdir[`${appState.promotion_square_info.x === 7 ? "b" : "w"}`];
		const newPosition = copyPosition(
			appState.position[appState.position.length - 1]
		);
		newPosition[appState.promotion_square_info.rank][
			appState.promotion_square_info.file
		] = "";
		newPosition[appState.promotion_square_info.x][
			appState.promotion_square_info.y
		] = color + option;

		/**
		 * new move notation when promot
		 */
		const newMove = getNewMoveNotation({
			piece: color + option,
			rank: appState.promotion_square_info.rank,
			file: appState.promotion_square_info.file,
			x: appState.promotion_square_info.x,
			y: appState.promotion_square_info.y,
			position: newPosition,
		});
		dispatch(
			makeNewMove({
				newPosition,
				newMove,
			})
		);

		dispatch(clearCandidates());
		if (arbitar.insufficientMaterial(newPosition)) {
			dispatch(dectactInSufficiantMatarial());
		} else if (arbitar.isStalemate(newPosition, opponet, castelDirection)) {
			dispatch(dectactStalemet());
		} else if (arbitar.isCheckMate(newPosition, opponet, castelDirection)) {
			dispatch(dectactCheckmate(appState.promotion_square_info.piece[0]));
		}
		dispatch(clearPromotionSqourInfo());
	};
	return (
		<div
			className='popup--inner promotion-choices'
			style={getPromotionBoxPosition()}>
			{options.map((option) => (
				<div
					key={option}
					className={`piece ${color}${option}`}
					onClick={() => handelClick(option)}
				/>
			))}
		</div>
	);
}

export default promot;
