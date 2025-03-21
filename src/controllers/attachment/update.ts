import { Request, Response } from "express";

import schema from "../../schemas/database/attachment"
import schemaUUID from "../../schemas/base/uuid";
import { updateAttachment } from "../../services/attachment";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = schema.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		res.sendStatus(400);
		return;
	}

	const attachment = updateAttachment(resultUUID.data, resultBody.data);

	res.status(202).send(await attachment);
}