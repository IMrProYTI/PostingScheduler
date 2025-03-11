import { config } from "dotenv";
import schema from "../schemas/environments";


class Environment {
	private env;

	constructor () {
		config();

		const result = schema.safeParse(process.env);
		if (!result.success)
			throw new Error(`Invalid environment variables`);
		
		this.env = result.data;
	}

	get port(): number {
		return this.env.PORT;
	}
}


const env = new Environment();
export default env;