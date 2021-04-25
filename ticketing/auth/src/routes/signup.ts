import express, { Response,Request } from 'express'
import jwt from 'jsonwebtoken'
import {body} from 'express-validator'

import {validateRequest,BadRequestError} from '@dzptickets/common'
import {User} from '../models/user'

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Password must be between 4 and 20 charactoers')
],
validateRequest,
async (req: Request, res:Response)=>{
    const {email,password} = req.body
    const existingUser = await User.findOne({email})

    if(existingUser){
       throw new BadRequestError('Email is in use')
    }

    const user = User.build({email,password})
    await user.save()

    //generate JWT
    const userJwt = jwt.sign({
        id:user.id,
        email: user.email
    },process.env.JWT_KEY!)

    //store it on session
    req.session = {
        jwt:userJwt
    }

    res.status(201).send(user)
})

export {router as signupRouter}