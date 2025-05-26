import { Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { deleteTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	deleteTask(result.data);

	res.status(202).send({ id: result.data });
	return;
}
