import { Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { getFirstPost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const post = getFirstPost(result.data);

	res.status(200).send(await post);
	return;
}