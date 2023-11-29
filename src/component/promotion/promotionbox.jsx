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
	updateAdvantage,
} from "../../reducer/move";
import { arbitar } from "../../arbitar/arbitar";
import { copyPosition, getNewMoveNotation } from "../../helper/helper";
import { evaluateBoard } from "../../arbitar/getMoves";
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
		try {
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

			const advantages = evaluateBoard({
				status: appState.status,
				piece: option,
				prevSum: appState.advantage,
				opponent: appState.opponent,
				from_: `${String.fromCharCode(
					97 + Number(appState.promotion_square_info.file)
				)}${Number(appState.promotion_square_info.rank + 1)}`,
				to_: `${String.fromCharCode(
					97 + Number(appState.promotion_square_info.y)
				)}${Number(appState.promotion_square_info.x + 1)}`,
				x: Number(appState.promotion_square_info.x),
				y: Number(appState.promotion_square_info.y),
				prevPosition: appState.position[appState.position.length - 1],
				promotion: option,
				opponentColor: appState.opponent,
				moveColor: color,
				newMove,
			});
			console.log("advantages at promotion", advantages);
			dispatch(updateAdvantage(advantages));
			dispatch(clearCandidates());
			if (arbitar.insufficientMaterial(newPosition)) {
				dispatch(dectactInSufficiantMatarial());
			} else if (arbitar.isStalemate(newPosition, opponet, castelDirection)) {
				dispatch(dectactStalemet());
			} else if (arbitar.isCheckMate(newPosition, opponet, castelDirection)) {
				dispatch(dectactCheckmate(appState.promotion_square_info.piece[0]));
			}
			dispatch(clearPromotionSqourInfo());
		} catch (e) {
			console.log(e, "Error happen promotion");
		}
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
