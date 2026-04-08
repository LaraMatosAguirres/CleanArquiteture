import {Request, Response} from "express";
import { Result } from "../Result";

export function handleServiceResult(res:Response, result:Result) {
    if (!result.ok) {
        return sendError(res, result.status || 500, result.error?.message || "Erro na operação")
    }

    return res.status(result.status || 200).json({
        data: result.value,
        statusCode: result.status || 200
    })
}

export function sendError(res:Response, statusCode:number, message:string) {
    return res.status(statusCode).json({
        error: message,
        statusCode
    })
}