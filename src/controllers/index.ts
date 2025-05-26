import errorHandler from "../shared/handler";

// Attachment
import attachmentGet from "./attachment/get";
import attachmentGetAll from "./attachment/getAll";
import attachmentCreate from "./attachment/create";
// import attachmentUpdate from "./attachment/update";
import attachmentDelete from "./attachment/delete";

// Booru
import booruGet from "./booru/get";
import booruRandom from "./booru/random";

// Post
import postGet from "./post/get";
import postCreate from "./post/create";
import postUpdate from "./post/update"
import postDelete from "./post/delete";

// Task
import taskGet from "./task/get";
import taskGetAll from "./task/getAll";
import taskCreate from "./task/create";
import taskUpdate from "./task/update";
import taskDelete from "./task/delete";


const attachment = {
	get: errorHandler(attachmentGet),
	getAll: errorHandler(attachmentGetAll),
	create: errorHandler(attachmentCreate),
	// update: errorHandler(attachmentUpdate),
	delete: errorHandler(attachmentDelete)
}

const booru = {
	get: errorHandler(booruGet),
	random: errorHandler(booruRandom)
}

const post = {
	get: errorHandler(postGet),
	create: errorHandler(postCreate),
	update: errorHandler(postUpdate),
	delete: errorHandler(postDelete)
}

const task = {
	get: errorHandler(taskGet),
	getAll: errorHandler(taskGetAll),
	create: errorHandler(taskCreate),
	update: errorHandler(taskUpdate),
	delete: errorHandler(taskDelete)
}


export { attachment, booru, post, task };
export default { attachment, booru, post, task };