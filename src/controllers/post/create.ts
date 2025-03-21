import { Request, Response } from "express";

import schema from "../../schemas/database/post";
import { createPost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const post = createPost(result.data);

	res.status(200).send(await post);
	return;
}
