type color = "red" | "yellow" | "base" | string;

const format = (color: color, message?: any) => {
	const date = new Date();
	const datetime = '['+
		date.toLocaleDateString()+'|'+date.toLocaleTimeString()+
	']';

	switch (color) {
		case "red":
			return `\x1b[31m${datetime} ${message}\x1b[0m"`;
		case "yellow":
			return `\x1b[33m${datetime} ${message}\x1b[0m`;
		default:
			return `\x1b[37m${datetime} ${message}\x1b[0m`;
	}
}

function info (message?: any) {
	console.info(format('base', `${message}`));
}

function warn (message?: any) {
	console.warn(format('yellow', `${message}`));
}

function error (message?: any) {
	console.error(format('red', `${message}`));
}

export default { info, warn, error };