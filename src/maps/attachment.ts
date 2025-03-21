import { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/attachment";


export const createAttachmentInput = (data: z.infer<typeof schema>): Prisma.AttachmentCreateInput => {
	return { fileURL: data.fileURL }
}

const optionalSchema = schema.partial();
export const updateAttachmentInput = (data: z.infer<typeof optionalSchema>): Prisma.AttachmentUpdateInput => {
	return { fileURL: data.fileURL }
}