import { Request, Response } from "express";
import logger from "../../shared/logger";

import schemaUUID from "../../schemas/base/uuid";
import { postUpdate } from "../../schemas/database/post";
import { updatePost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);
	const resultBody = postUpdate.safeParse(req.body);

	if (!resultUUID.success || !resultBody.success) {
		if (resultUUID.error) logger.warn(resultUUID.error);
		if (resultBody.error) logger.warn(resultBody.error);
		res.sendStatus(400);
		return;
	}

	const post = updatePost(resultUUID.data, resultBody.data);

	res.status(200).send(await post);
	return;
}
