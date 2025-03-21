import { Request, Response } from "express";

import schema from "../../schemas/database/attachment";
import { createAttachment } from "../../services/attachment";


export default async (req: Request, res: Response) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const attachment = createAttachment(result.data);
	
	res.status(201).send(await attachment);
	return;
}