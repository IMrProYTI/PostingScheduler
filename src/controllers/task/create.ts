import { Request, Response } from "express";

import schema from "../../schemas/database/task";
import { createTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const task = createTask(result.data);

	res.status(200).send(await task);
	return;
}
