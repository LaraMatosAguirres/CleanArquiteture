import express, {Express, Router, Request, Response} from "express";
import AuthorController from "./presentation/controllers/AuthorController";
import QuoteController from "./presentation/controllers/QuoteController";

const app: Express = express()
app.use(express.json())

const routes = Router()
routes.use("/authors", AuthorController)
routes.use("/quotes", QuoteController)


app.use("/api", routes)


export default app