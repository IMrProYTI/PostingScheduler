import { Prisma } from "../config/prisma";

import type { attachmentCreateType, attachmentUpdateType } from "../schemas/database/attachment";


export const createAttachmentInput = (data: attachmentCreateType): Prisma.AttachmentCreateInput => {
	return { ...data }
}

export const updateAttachmentInput = (data: attachmentUpdateType): Prisma.AttachmentUpdateInput => {
	return { ...data }
}