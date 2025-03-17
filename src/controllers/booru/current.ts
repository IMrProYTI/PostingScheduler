import { Request, Response } from 'express';
import booru from '../../services/booru';
import { z } from 'zod';


export default async (req: Request, res: Response) => {
	const result = z.coerce.number().safeParse(req.params.id);

	if (!result.success)
		res.sendStatus(400);
	else {
		const post = await booru.getPost(result.data);
		res.status(200).send(post);
	}
}