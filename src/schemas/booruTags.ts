import { z } from 'zod';


const schema = z.union([
	z.string().array().nonempty(),
	z.string(),
	z.undefined()
]);


export default schema;