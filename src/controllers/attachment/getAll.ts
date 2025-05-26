import { NextFunction, Request, Response } from "express";

import { getAllAttachments } from "../../services/attachment";


export default async (req: Request, res: Response, next: NextFunction) => {
	const attachments = getAllAttachments();
	
	res.status(200).send(await attachments);
	return;
}