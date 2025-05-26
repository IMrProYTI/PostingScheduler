import { Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { taskUpdate } from "../../schemas/database/task";
import { updateTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = taskUpdate.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		if (resultUUID.error) logger.warn(resultUUID.error);
		if (resultBody.error) logger.warn(resultBody.error);
		res.sendStatus(400);
		return;
	}

	const task = updateTask(resultUUID.data, resultBody.data);

	res.status(200).send(await task);
	return;
}
