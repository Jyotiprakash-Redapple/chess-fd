import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/Provider";
import appConfig from "../../appconfig/appconfig";
import "./countdown.css";
function countdown() {
	const [time, setTime] = React.useState(0);
	const auth_token = localStorage.getItem(appConfig.localStorageAuth);
	const countRef = React.useRef(0);
	const { appState, dispatch } = useAppContext();
	const navigate = useNavigate();

	const handelBack = () => {
		console.log(appState.position);
		if (!Object.keys(appState.position).length) {
			navigate(`/?auth_token=${auth_token}`, { replace: true });
			appState.socket.onQueueLeave();
		}
	};

	React.useEffect(() => {
		const timer = window.setInterval(() => {
			let currentTime = countRef.current;
			countRef.current = currentTime + 1;
			setTime(currentTime);
		}, 1000);

		return () => {
			window.clearInterval(timer);
		};
	}, []);

	React.useEffect(() => {
		if (countRef.current === 30) {
			handelBack();
		}
	}, [time]);

	// Optionally, you can use another useEffect to reset the timer when the position is found.
	React.useEffect(() => {
		if (Object.keys(appState.position).length) {
			countRef.current = 0;
		}
	}, [appState.position]);
	return (
		<div className='_cont'>
			<div className='_spinner'></div>
			<span className='_number'></span>
		</div>
	);
}

export default countdown;
