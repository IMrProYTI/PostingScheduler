import { NextFunction, Request, Response } from "express";
import logger from "../../shared/logger";

import { attachmentCreate } from "../../schemas/database/attachment";
import { createAttachment } from "../../services/attachment";


export default async (req: Request, res: Response, next: NextFunction) => {
	const result = attachmentCreate.safeParse(req.body);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	const attachment = createAttachment(result.data);

	res.status(201).send(await attachment);
	return;
}