import { Request, Response } from "express";

import booru from "../../services/booru";
import schemaUUID from "../../schemas/base/uuid";


export default async (req: Request, res: Response) => {
	const result = schemaUUID.safeParse(req.params.id);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const post = booru.getPost(result.data);

	res.status(200).send(await post);
	return;
}