import express from 'express'
import {currentUser} from '@dzptickets/common'

const router = express.Router();

router.get('/api/users/currentuser',currentUser,(req, res)=>{
        res.send({currentuser: req.currentUser || null})
})

export {router as currentUserRouter}