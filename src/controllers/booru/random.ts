import { Request, Response } from 'express';
import booru from '../../services/booru';
import { z } from 'zod';


export default async (req: Request, res: Response) => {
	const { tags } = req.query;
	let post: any;

	if (tags) {
		const result = z.union([
			z.string().array().nonempty(),
			z.string()
		]).safeParse(tags);

		if (!result.success) {
			res.sendStatus(400);
			return;
		} else {
			post = await booru.getRandom(result.data);
		}
	} else {
		post = await booru.getRandom();
	}

	res.status(200).send(post);
	return;
}