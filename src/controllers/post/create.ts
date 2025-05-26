import { Request, Response } from "express";
import logger from "../../shared/logger";

import { postCreate } from "../../schemas/database/post";
import { createPost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const result = postCreate.safeParse(req.body);

	if (!result.success) {
		logger.warn(result.error);
		res.sendStatus(400);
		return;
	}

	const post = createPost(result.data);
		
	res.status(201).send(await post);
	return;
}
