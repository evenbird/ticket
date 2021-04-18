import { NextFunction,Response,Request } from 'express'
import {CustomError} from '../error/custom-error'

export const errorHandler = (err:Error, req:Request,res:Response,next:NextFunction) =>{

    if (err instanceof CustomError){
        return res.status(err.statusCode).send({errors:err.serializeErrors()})
    }

    res.status(400).send({
        errors: [{message:'something went wrong'}]
    })
    
}