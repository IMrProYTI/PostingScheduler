import { Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { deleteAttachment } from "../../services/attachment";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	deleteAttachment(result.data);

	res.status(202).send({ id: result.data });
	return;
}