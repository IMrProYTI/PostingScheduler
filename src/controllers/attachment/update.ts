import { NextFunction, Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { attachmentUpdate } from "../../schemas/database/attachment"
import { updateAttachment } from "../../services/attachment";


export default async (req: Request, res: Response, next: NextFunction) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = attachmentUpdate.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		if (resultUUID.error) logger.warn(resultUUID.error);
		if (resultBody.error) logger.warn(resultBody.error);
		res.sendStatus(400);
		return;
	}

	try {
		const attachment = updateAttachment(resultUUID.data, resultBody.data);
		
		res.status(202).send(await attachment);
		return;
	} catch (e: any) {
		if (e.name === 'PrismaClientKnownRequestError') {
			res.sendStatus(400);
			return;
		} else {
			logger.error(e);
			
			res.sendStatus(500);
			return;
		}
	}
}