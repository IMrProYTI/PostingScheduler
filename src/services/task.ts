import prisma, { Prisma, Task } from "../config/prisma";
import { randomUUID } from "crypto";
const taskDB = prisma.task;


export const getTasks = async (): Promise<Task[]> => {
	return await taskDB.findMany();
}

export const getTask = async (taskId: string): Promise<Task|null> => {
	return await taskDB.findUnique({
		where: { id: taskId }
	});
}

export const createTask = async (taskData: Prisma.TaskCreateInput): Promise<Task> => {
	return taskDB.create({
		data: {
			...taskData,
			id: randomUUID()
		}
	})
}

export const updateTaskPostTimestamp = async (taskId: string, post_timestamp: Date) => {
	return taskDB.update({
		where: { id: taskId },
		data: { post_timestamp }
	})
}

export const deleteTask = async (taskId: string) => {
	return taskDB.delete({
		where: { id: taskId }
	})
}
