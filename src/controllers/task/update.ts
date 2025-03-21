import { Request, Response } from "express";

import schema from "../../schemas/database/task";
import schemaUUID from "../../schemas/base/uuid";
import { updateTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = schema.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		res.sendStatus(400);
		return;
	}

	const task = updateTask(resultUUID.data, resultBody.data);

	res.status(200).send(await task);
	return;
}
