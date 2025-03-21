import prisma, { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/attachment";
import { createAttachmentInput, updateAttachmentInput } from "../maps/attachment";


export const getFirstAttachment = async (id: string) => {
	return await prisma.attachment.findFirst({
		where: { id }
	});
}

export const createAttachment = async (data: z.infer<typeof schema>) => {
	return await prisma.attachment.create({
		data: createAttachmentInput(data)
	});
}

export const updateAttachment = async (id: string, data: z.infer<typeof schema>) => {
	return await prisma.attachment.update({
		where: { id },
		data: updateAttachmentInput(data)
	});
}

export const deleteAttachment = async (id: string) => {
	return await prisma.attachment.delete({
		where: { id }
	});
}