import express from "express";
import env from "./config/env";
import Logger from "./shared/logger";


const app = express();
app.use(express.json());

import routes from './routes';
app.use('/api', routes);

import logger from "./middlewares/logger";
app.use(logger);


app.listen(env.port, (err) => {
	if (err) Logger.error(err);
	else Logger.info(`Server listen on ${env.port} port`);
});