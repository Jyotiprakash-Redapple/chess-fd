import React from "react";
import Promoption from "./promotionbox";
import { useAppContext } from "../../context/Provider";

import { gameStatus } from "../../reducer/constant";
function popupbox() {
	const { appState, dispatch } = useAppContext();

	if (appState.status === gameStatus.ongoing) {
		return null;
	}
	return (
		<div className="popup">
			<Promoption />
		</div>
	);
}

export default popupbox;
