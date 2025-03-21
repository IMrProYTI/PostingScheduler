import { Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { deleteTask } from "../../services/task";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);

	if (!resultUUID.success) {
		res.sendStatus(400);
		return;
	}

	deleteTask(resultUUID.data);

	res.status(202).send({ id: resultUUID.data });
	return;
}
