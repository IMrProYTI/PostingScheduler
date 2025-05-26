import { NextFunction, Request } from "express";
import logger from "../shared/logger";


export default (req: Request, _res: any, next: NextFunction) => {
	let log = `${req.method} ${req.url}`;

	if (req.body && JSON.stringify(req.body) !== '{}') {
		log += 
		`\n=============== Body ===============\n`+
		JSON.stringify(req.body, undefined, '\t')+
		`\n====================================`;
	}

	logger.info(log);
	next();
}