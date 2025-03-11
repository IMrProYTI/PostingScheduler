import logger from "../shared/logger";


export default (req: any, _res: any, next: () => void) => {
	logger.info(['',
		`From ${req.ip}`,
		`Request ${req.url}`
	].join('\n\t'));
	next();
}