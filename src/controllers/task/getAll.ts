import { Request, Response } from "express";

import { getTasks } from "../../services/task";


export default async (req: Request, res: Response) => {
	const task = getTasks();

	res.status(200).send(await task);
	return;
}