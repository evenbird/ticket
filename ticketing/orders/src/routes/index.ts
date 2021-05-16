import express, { Request, Response } from 'express';
import { NotFoundError } from '@dzptickets/common';
// import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  // const ticket = await Ticket.find({});

  res.send({});
});

export { router as indexOrderRouter };
