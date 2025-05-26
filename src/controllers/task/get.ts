import { Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { getFirstTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	const task = getFirstTask(result.data);

	res.status(200).send(await task);
	return;
}