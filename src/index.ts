import express from "express";

const app = express()

app.listen(3000, (err) => {
	if (err) console.error(err);
	else console.log(`Server listen on 3000 port`);
})