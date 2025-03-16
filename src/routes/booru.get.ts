import { Router } from 'express';
import booru from '../services/booru';
import { z } from 'zod';


const route = Router();

route.get('/random', async (req, res) => {
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
})

route.get('/:id', async (req, res) => {
	const result = z.coerce.number().safeParse(req.params.id);

	if (!result.success)
		res.sendStatus(400);
	else {
		const post = await booru.getPost(result.data);
		res.status(200).send(post);
	}
})


export default route;