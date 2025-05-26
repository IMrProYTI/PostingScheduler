import { NextFunction, Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { deleteAttachment } from "../../services/attachment";


export default async (req: Request, res: Response, next: NextFunction) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	const attachment = deleteAttachment(result.data);

	res.status(200).send(await attachment);
	return;
}