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
	if (typeof result.data === 'string')
		if (result.data.includes('+'))
			tags.push(...result.data.split('+'));
		else
			tags.push(result.data);
	else
		for (const tag of result.data!)
			if (tag.includes('+'))
				tags.push(...tag.split('+'));
			else
				tags.push(tag);


	const post = await booru.getRandom(tags);
	console.log(typeof post, post)

	res.status(200).send(await post);
	return;
}