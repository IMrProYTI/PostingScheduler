import { Request, Response } from "express";

import booru from "../../services/booru";
import booruTags from "../../schemas/booruTags";


export default async (req: Request, res: Response) => {
	const result = booruTags.safeParse(req.query.tags);

	if (!result.success) {
		res.sendStatus(400);
		return;
	}

	const tags = [];
	for (const tag of result.data!)
		if (tag.includes('+'))
			tags.push(...tag.split('+'));

	const post = booru.getRandom(tags);

	res.status(200).send(await post);
	return;
}