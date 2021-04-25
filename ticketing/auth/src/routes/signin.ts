import express, { Response,Request } from 'express'
import {body} from 'express-validator'
import {validateRequest,BadRequestError} from '@dzptickets/common'
import { User } from '../models/user';
import {Password} from '../services/password'
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res:Response)=>{
    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     throw new RequestValidationError(errors.array())
    // }
    const {email,password} = req.body
    const existingUser = await User.findOne({email})
    if(!existingUser){
        throw new BadRequestError('Invalid credential')
    }

    const passwordsMatch = await Password.compare(existingUser.password,password)
    if(!passwordsMatch){
        throw new BadRequestError('Invalid credential')
    }

     //generate JWT
     const userJwt = jwt.sign({
        id:existingUser.id,
        email: existingUser.email
    },process.env.JWT_KEY!)

    //store it on session
    req.session = {
        jwt:userJwt
    }

    res.status(200).send(existingUser)
})

export {router as signinRouter}