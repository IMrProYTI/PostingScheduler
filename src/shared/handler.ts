import { NextFunction, Request, Response } from "express";
import logger from "./logger";


export default (callback: Function) =>
	(req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(callback(req, res, next)).catch((reason) => callbackCatch(req, res, reason));

function callbackCatch(_req: Request, res: Response, reason: any) {
	res.status(500).send({
		error: 'Internal Server Error',
		message: reason,
	})
}