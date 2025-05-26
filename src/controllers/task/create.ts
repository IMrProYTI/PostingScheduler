import { Request, Response } from "express";
import logger from "../../shared/logger";

import { taskCreate } from "../../schemas/database/task";
import { createTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const result = taskCreate.safeParse(req.body);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	const task = createTask(result.data);

	res.status(200).send(await task);
	return;
}
