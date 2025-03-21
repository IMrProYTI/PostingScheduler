import { Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { getFirstAttachment } from "../../services/attachment";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const attachment = getFirstAttachment(result.data);

	res.status(200).send(await attachment);
	return;
}