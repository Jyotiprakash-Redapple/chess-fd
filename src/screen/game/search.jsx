import React, { useState, useEffect } from "react";
import appConfig from "../../appconfig/appconfig";
import { gameStatus } from "../../reducer/constant";
import { useAppContext } from "../../context/Provider";
import { useNavigate } from "react-router-dom";
function search() {
	const [avatars, setAvatars] = useState(appConfig.avatarArray);
	const { appState, dispatch } = useAppContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (appState.status === gameStatus.pending) {
			const interval = setInterval(() => {
				setAvatars([...avatars.slice(1), avatars[0]]); // Rotate avatars
			}, 100);

			return () => clearInterval(interval);
		} else {
			navigate("/play-game", { replace: true });
		}
	}, [avatars]);

	useEffect(() => {
		appState.socket.getGameInitFromServer(dispatch);
	}, []);
	return (
		<>
			{appState.socket_id ? (
				<div className='avatar_auther_column'>
					<div className='avatar_auther'>
						<img
							src={
								appConfig.avatarArray[Math.floor(Math.random() * appConfig.avatarArray.length)]
									.avatar
							}
							alt={``}
						/>
					</div>
					<div className='auther_name'>
						{
							appConfig.avatarArray[Math.floor(Math.random() * appConfig.avatarArray.length)]
								.name
						}
					</div>
				</div>
			) : (
				<div className='avatar-column'>
					{avatars.map((avatar, index) => (
						<div className='avatar_opponent' key={index}>
							<img key={index + 1} src={avatar.avatar} alt={avatar.name} />
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default search;
