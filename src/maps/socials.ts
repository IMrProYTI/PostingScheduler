import { Prisma } from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/social";


export const createSocialInput = (data: z.infer<typeof schema>): Prisma.SocialCreateInput => {
	return { type: data.type }
}

// const optionalSchema = schema.partial();
// export const updateAttachmentInput = (data: z.infer<typeof optionalSchema>): Prisma.SocialUpdateInput => {
// 	return {  }
// }