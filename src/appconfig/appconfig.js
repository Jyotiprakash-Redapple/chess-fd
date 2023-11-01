const appConfig = {};
import Avatar1 from "../assets/app/search_avatar/avatar1.jpg";
import Avatar2 from "../assets/app/search_avatar/avatar2.jpg";
import Avatar3 from "../assets/app/search_avatar/avatar3.jpg";
import Avatar4 from "../assets/app/search_avatar/avatar4.png";
import Avatar5 from "../assets/app/search_avatar/avatar5.jpg";
import Avatar6 from "../assets/app/search_avatar/avatar6.jpg";
import Avatar7 from "../assets/app/search_avatar/avatar7.jpg";

import Avatar8 from "../assets/app/search_avatar/avatar8.jpg";
import Avatar9 from "../assets/app/search_avatar/avatar9.jpg";
import Avatar10 from "../assets/app/search_avatar/avatar10.png";
import Avatar11 from "../assets/app/search_avatar/avatar11.jpg";
import Avatar12 from "../assets/app/search_avatar/avatar12.png";
import Avatar13 from "../assets/app/search_avatar/avatar13.jpeg";
import Avatar14 from "../assets/app/search_avatar/avatar14.jpg";
import Avatar15 from "../assets/app/search_avatar/avatar15.jpg";

import wp from "../assets/wp.png";
import wb from "../assets/wb.png";
import wk from "../assets/wk.png";
import wn from "../assets/wn.png";
import wr from "../assets/wr.png";
import wq from "../assets/wq.png";

import bp from "../assets/bp.png";
import bb from "../assets/bb.png";
import bk from "../assets/bk.png";
import bn from "../assets/bn.png";
import br from "../assets/br.png";
import bq from "../assets/bq.png";
appConfig.socketAuthKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lX2lkIjoxMywiYmF0dGxlX2lkIjo4LCJ1c2VyX2lkIjo3LCJ1c2VyX25hbWUiOiJUZXN0MSIsInByb2ZpbGVfcGljdHVyZSI6Imh0dHA6Ly8zLjEzNy44Ni4yMzc6NTAwMC9wcm9maWxlX3Bob3RvLzE2ODYwMzI1NjkzMzYtanVzdGdhbWUucG5nIiwiYm90X2lkIjpudWxsLCJib3RfbmFtZSI6bnVsbCwiZW50cnlfZmVlIjoxMCwid2lubmluZ19hbW91bnQiOjE4LCJpYXQiOjE2OTAyNzE5OTksImV4cCI6MTcyMTgyOTU5OX0.n-9oUATGJ4ojYq2oXcRdSPbQqabXIlFw227dTdkx5TI";

appConfig.socketURL = `http://16.163.81.210:5002/poolio?auth_token=${appConfig.socketAuthKey}`;

appConfig.avatarArray = [
	{ name: "Robot", avatar: Avatar1 },
	{ name: "Pyhsot", avatar: Avatar2 },
	{ name: "Liza", avatar: Avatar3 },
	{ name: "Somya", avatar: Avatar4 },
	{ name: "Rohini", avatar: Avatar5 },
	{ name: "Ram", avatar: Avatar6 },
	{ name: "Chiku", avatar: Avatar7 },
	{ name: "Robot", avatar: Avatar8 },
	{ name: "Pyhsot", avatar: Avatar9 },
	{ name: "Liza", avatar: Avatar10 },
	{ name: "Somya", avatar: Avatar11 },
	{ name: "Rohini", avatar: Avatar12 },
	{ name: "Ram", avatar: Avatar13 },
	{ name: "Chiku", avatar: Avatar14 },
	{ name: "Chiku", avatar: Avatar15 },
];

appConfig.pices = {
	wb,
	wk,
	wp,
	wn,
	wr,
	wq,
	bb,
	bp,
	bk,
	bn,
	br,
	bq,
};

appConfig.socket = {
	emit: {
		queueJoin: "queue-join",
	},
	listen: {
		gameStart: "game-start",
	},
};
appConfig.localStorageAuth = "cheesio_auth";
export default appConfig;
