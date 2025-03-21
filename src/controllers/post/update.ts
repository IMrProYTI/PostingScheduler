import { Request, Response } from "express";

import schema from "../../schemas/database/post";
import schemaUUID from "../../schemas/base/uuid";
import { updatePost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = schema.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		res.sendStatus(400);
		return;
	}

	const post = updatePost(resultUUID.data, resultBody.data);

	res.status(200).send(await post);
	return;
}
