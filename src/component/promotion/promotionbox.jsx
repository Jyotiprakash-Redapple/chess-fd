import React from "react";
import { useAppContext } from "../../context/Provider";
import {
	makeNewMove,
	clearCandidates,
	closePromotionBox,
} from "../../reducer/move";
import { copyPosition } from "../../helper/helper";
function promot() {
	const options = ["q", "r", "b", "n"];

	const { appState, dispatch } = useAppContext();

	// console.log(appState, "app state promotion box");
	if (!Object.keys(appState.promotion).length) {
		return null;
	}
	const color = appState.promotion.x === 7 ? "w" : "b";
	const getPromotionBoxPosition = () => {
		let style = {
			zIndex: 2,
		};

		if (appState.promotion.x === 7) {
			style.top = "2%";
		} else {
			style.top = "81.5%";
		}

		if (appState.promotion.y <= 1) {
			style.left = "0%";
		} else if (appState.promotion.y >= 5) {
			style.right = "0%";
		} else {
			style.left = `${12.5 * appState.promotion.y - 20}%`;
		}

		return style;
	};

	const handelClick = (option) => {
		console.log(option);

		const newPosition = copyPosition(
			appState.position[appState.position.length - 1]
		);
		newPosition[appState.promotion.rank][appState.promotion.file] = "";
		newPosition[appState.promotion.x][appState.promotion.y] = color + option;

		dispatch(closePromotionBox({}));
		dispatch(clearCandidates());
		dispatch(makeNewMove(newPosition));
	};
	return (
		<div
			className="popup--inner promotion-choices"
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
