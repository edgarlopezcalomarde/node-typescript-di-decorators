import { initializeControllers, registerControllers } from "@lib/ControllerRegistry";
import express, { Router } from "express";
import UserController from "./users/UserController";
import ProductRouter from "./product/ProductRouter";


import helmet from "helmet";
import compress from 'compression';
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "@lib/Logger";
import { createLogger } from "winston";
import { wrapAsyncControllers } from "@lib/AsyncController";


const app = express()
const router = Router();
const logger = createLogger();


app.use(requestLogger(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());
app.use(cors());


wrapAsyncControllers(router)
registerControllers([
    UserController
]);
initializeControllers(router)

router.use(ProductRouter)
app.use(router);

export default app;
