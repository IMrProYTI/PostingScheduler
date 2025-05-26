import { NextFunction, Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { getFirstAttachment } from "../../services/attachment";
import logger from "../../shared/logger";


export default async (req: Request, res: Response, next: NextFunction) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		logger.warn(result.error);

		res.sendStatus(400);
		return;
	}

	const attachment = getFirstAttachment(result.data);
	
	if ((await attachment) === null) {
		res.sendStatus(404);
		return;
	}
	
	res.status(200).send(await attachment);
	return;
}