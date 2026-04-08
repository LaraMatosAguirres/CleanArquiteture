import { Router, Request, Response} from "express";

import { QuoteService } from "../../application/QuoteService";
import QuoteRepository  from "../../infraestructure/repositories/QuoteRepository";
import AuthorRepository  from "../../infraestructure/repositories/AuthorRepository";

import { Result } from "src/application/Result";
import {handleServiceResult, sendError} from "../../application/utils/controllerUtils"

const quoteService = new QuoteService(QuoteRepository, AuthorRepository)
const QuoteController:Router = Router()

QuoteController.post("/", async(req:Request, res:Response)=>{
    try{
        const body = req.body
        const result = await quoteService.createQuote(body)
        handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error("Erro ao criar nova citação ", error)
        sendError(res, 500, "Problemas ao criar nova citação")
    }
})

QuoteController.get("/", async(req:Request, res:Response)=>{
    try{
        const result = await quoteService.getAll()
        handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error("Erro ao tentar recuperar todas as citações", error)
        sendError(res, 500, "Problemas ao recuperar citações")
    }
})



export default QuoteController