import { Request, Response } from "express";
import { z } from "zod";

import booru from "../../services/booru";


export default async (req: Request, res: Response) => {
	const result = z.coerce.number().safeParse(req.params.id)

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const post = booru.getPost(result.data);

	res.status(200).send(await post);
	return;
}