import React from "react";
import { useAppContext } from "../../../context/Provider";
function rank(props) {
	const { appState } = useAppContext();
	return (
		<div
			className="rank"
			style={{
				transform:
					appState.opponent === "w" ? `rotate(${180}deg)` : `rotate(${0}deg)`,
			}}>
			{props.rank.map((el, i) => (
				<span
					key={i}
					style={{
						backgroundColor: i % 2 === 0 ? "white" : "black", // Alternate between white and black squares
						color: i % 2 === 0 ? "black" : "white", // Text color for contrast
						boxShadow:
							"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
						border: "1px solid black", // Add a border to separate squares
						width: "25px", // Set width for the squares
						height: "25px", // Set height for the squares
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "100%",
					}}>
					{el}
				</span>
			))}
		</div>
	);
}

export default rank;
