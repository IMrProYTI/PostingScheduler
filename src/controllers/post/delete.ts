import { Request, Response } from "express";

import schemaUUID from "../../schemas/base/uuid";
import { deletePost } from "../../services/post";


export default async (req: Request, res: Response) => {
	const resultUUID = schemaUUID.safeParse(req.params.id);

	if (!resultUUID.success) {
		res.sendStatus(400);
		return;
	}

	deletePost(resultUUID.data);

	res.status(202).send({ id: resultUUID.data });
	return;
}
