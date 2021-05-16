import express, { Request, Response } from 'express';
import { NotFoundError } from '@dzptickets/common';
// import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  // const ticket = await Ticket.findById(req.params.id);

  // if (!ticket) {
  //   throw new NotFoundError();
  // }

  res.send({});
});

export { router as showOrderRouter };
