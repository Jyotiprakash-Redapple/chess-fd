import { io } from "socket.io-client";
import { gameInit, updateBoard } from "../reducer/move";
class Client {
	constructor(gameSceneInstance) {
		this.gameSceneRefence = gameSceneInstance;
		this.urlParams = new URLSearchParams(window.location.search);
		this.token = this.urlParams.get("auth_token");
		this.baseUrl = "http://staging.redappletech.com:5002/chessio";
		this.socket = io(this.baseUrl, {
			query: {
				auth_token: this.token,
			},
		});

		this.soundName = null;

		this._initSocketListeners();

		// this.getGameInitFromServer();
		// this.ListenCurrentState();
		// this.StartTimerFromServer();
		// this.GetTimerFromServer();
		// this.StartDrawFromServer();
		// this.CurrentDrawNumberFromServer();
		// this.StopDrawNumberFromServer();
	}
	create() {}
	_initSocketListeners() {
		// console.log('connecting to socket');
		let ref = this;
		this.socket.on("connect", (socket) => {
			console.log("Successfully connected!");
		});
	}
	getGameInitFromServer(dispatch) {
		this.socket.on("game-start", (arg) => {
			dispatch(gameInit({ arg }));
			console.log("game start receive from server", arg);
		});
	}
	getUpdateDetailsFromServer(dispatch) {
		this.socket.on("update-details", (arg) => {
			dispatch(updateBoard({ arg }));
			console.log("Game Update Details From Server", arg);
		});
	}

	onUpdateMove(board) {
		this.socket.emit("update-move", { board });
	}
	onUpdateWin(data) {
		console.log("resukt", data);
		this.socket.emit("update-scrore", data);
	}
	onRendomMatch() {
		this.socket.emit("queue-join");
	}

	// ListenCurrentState() {
	// 	this.socket.on("current-state", (data) => {
	// 		// console.log('current-state', data);
	// 		// data.state = 2;
	// 		if (data.state == 1) {
	// 			// this.gameSceneRefence.previousDraw.create();
	// 			// console.log(this.gameSceneRefence.previousDraw)
	// 			this.gameSceneRefence.previousDraw.ShowPreviousDrawObjects();
	// 		} else if (data.state == 2) {
	// 			// console.log(this.gameSceneRefence.drawClass)
	// 			this.gameSceneRefence.drawClass.ShowDrawClassObjects();
	// 		} else if (data.state == 3) {
	// 			// console.log(this.gameSceneRefence.drawHistory)
	// 			this.gameSceneRefence.drawHistory.ShowDrawNumberHistory();
	// 		} else {
	// 		}

	// 		// this.gameSceneRefence.previousDraw.create();
	// 	});
	// }
	// StartTimerFromServer() {
	// 	// console.log('StartTimerFromServer')
	// 	this.socket.on("start-timer", (data) => {
	// 		// console.log('start-timer', data);
	// 		// this.gameSceneRefence.previousDraw.create();
	// 	});
	// }

	// GetTimerFromServer() {
	// 	// console.log('GetTimerFromServer');

	// 	this.socket.on("update-timer", (data) => {
	// 		// console.log('update-timer',data);
	// 		this.gameSceneRefence.drawNumberHits.HideDrawNumberHits();
	// 		this.gameSceneRefence.drawClass.HideDrawClassObjects();
	// 		this.gameSceneRefence.drawHistory.HideDrawNumberHistory();
	// 		this.gameSceneRefence.previousDraw.ShowPreviousDrawObjects();
	// 		this.gameSceneRefence.previousDraw.CreateTimer(data);
	// 	});
	// }

	// StartDrawFromServer() {
	// 	// console.log('StartDrawFromServer')
	// 	this.socket.on("start-draw", (data) => {
	// 		// console.log('start-draw', data);
	// 		// this.gameSceneRefence.drawClass.ShowDrawClassObjects();
	// 		this.gameSceneRefence.drawClass.StartDraw();
	// 	});
	// }

	// CurrentDrawNumberFromServer() {
	// 	// console.log('CurrentDrawTimerFromServer')
	// 	this.socket.on("update-draw", (data) => {
	// 		let time = performance.now();
	// 		// console.log('update-draw', data, time);
	// 		this.gameSceneRefence.drawHistory.HideDrawNumberHistory();
	// 		this.gameSceneRefence.previousDraw.HidePreviousDrawObjects();
	// 		this.gameSceneRefence.drawClass.ShowDrawClassObjects();
	// 		this.gameSceneRefence.drawClass.GetCurrentDrawDataFromServer(data);
	// 	});
	// }
	// StopDrawNumberFromServer() {
	// 	// console.log('CurrentDrawTimerFromServer')
	// 	this.socket.on("stop-draw", (data) => {
	// 		// console.log('stop-draw', data);
	// 		this.gameSceneRefence.drawClass.HideDrawClassObjects();
	// 		this.gameSceneRefence.previousDraw.HidePreviousDrawObjects();
	// 		this.gameSceneRefence.drawClass.StopAllBlinkTween();
	// 		this.gameSceneRefence.drawHistory.ShowDrawNumberHistory();
	// 		this.gameSceneRefence.drawHistory.LoadFinalScene();
	// 	});
	// }

	// OnBubblePressed(_txt) {
	// 	this.socket.emit("txt2Speech", { text: _txt });
	// }
}

// let client = new Client();

// export { client as Client };
export default Client;
