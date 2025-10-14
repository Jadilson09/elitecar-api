import expres from "express";
import cors from "cors";
import { router } from "./routes.js";

const server = expres();
server.use(cors());
server.use(expres.json());
server.use(router);

export { server };