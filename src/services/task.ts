import prisma from "../config/prisma";
import { z } from "zod";

import schema from "../schemas/database/task";
import { createTaskInput, updateTaskInput } from "../maps/task";


export const getTasks = async () => {
	return await prisma.task.findMany();
}

export const getFirstTask = async (id: string) => {
	return await prisma.task.findFirst({
		where: { id }
	});
}

export const createTask = async (data: z.infer<typeof schema>) => {
	return await prisma.task.create({
		data: createTaskInput(data)
	})
}

export const updateTask = async (id: string, data: z.infer<typeof schema>) => {
	return await prisma.task.update({
		where: { id },
		data: updateTaskInput(data)
	})
}

export const deleteTask = async (id: string) => {
	return await prisma.task.delete({
		where: { id }
	})
}
