import express,{ Request, Response} from 'express';
import {requireAuth, validateRequest} from '@dzptickets/common'
import {body} from  'express-validator'
import {Ticket} from '../models/tickets'
const router = express.Router();

router.post('/api/tickets',requireAuth,[
    //validator to validate the request title is not empty
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    //validator to validate the request price 
    body('price')
    .isFloat({gt:0}) //greater than 0
    .withMessage('Price must be greater than 0'),
],validateRequest /* validateRequest error throw*/,
async(req:Request,res:Response)=>{
    const {title, price} = req.body

    // send record to mongo db
    const ticket = Ticket.build({
        title,
        price,
        userId:req.currentUser!.id
    })
    await ticket.save();
    res.sendStatus(201).send(ticket)
})

export {router as createTicketRouter};