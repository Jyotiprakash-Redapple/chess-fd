import React from "react";
function promot() {
	const color = "b";
	const options = ["q", "r", "b", "n"];
	const x = 7;
	const y = 7;
	const getPromotionBoxPosition = () => {
		let style = {
			zIndex: 2,
		};

		if (x === 7) {
			style.top = "2%";
		} else {
			style.top = "81.5%";
		}

		if (y <= 1) {
			style.left = "0%";
		} else if (y >= 5) {
			style.right = "0%";
		} else {
			style.left = `${12.5 * y - 20}%`;
		}

		return style;
	};
	return (
		<div
			className="popup--inner promotion-choices"
			style={getPromotionBoxPosition()}>
			{options.map((option) => (
				<div key={option} className={`piece ${color}${option}`} />
			))}
		</div>
	);
}

export default promot;
