import React from "react";
import s from "./button.module.css";
function Button({ text }) {
	return (
		<button className={s.button_container} role='button'>
			<span className={s.text}>{text}</span>
			<span className={s.button_background}></span>
			<span className={s.button_border}></span>

			<svg style={{ position: "absolute", width: "0", height: "0" }}>
				<filter id='remove-black-button-13' color-interpolation-filters='sRGB'>
					<feColorMatrix
						type='matrix'
						values='1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -1 -1 -1 0 1'
						result='black-pixels'></feColorMatrix>
					<feComposite in='SourceGraphic' in2='black-pixels' operator='out'></feComposite>
				</filter>
			</svg>
		</button>
	);
}

export default Button;
