import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import {natsWrapper} from '../../nats-wrapper'

describe('update test',()=>{

  let id:string;

  beforeAll(()=>{
    id = new mongoose.Types.ObjectId().toHexString();
  })

  it('return a 404 if the provided id does not exist', async () => {
  
    await request(app).put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title:'abc',
      price:20
    })
    .expect(404);
  });
  
  it('return a 401 if user is not authenticated', async () => {
  
    await request(app).put(`/api/tickets/${id}`)
    .send({
      title:'abc',
      price:20
    })
    .expect(401);
  });
  
  it('return a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', global.signin())
    .send({
      title:'abc',
      price:20
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',global.signin())
    .send({
      title:'abc',
      price:1000
    })
    .expect(401)
  });
  
  it('return a 400 if the provided an invalid price and title', async () => {
    const cookie =  global.signin()
    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',cookie)
    .send({
      title:'abc',
      price:20
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
      title:'',
      price:20
    })
    .expect(400)


    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
      title:'ass',
      price: -10
    })
    .expect(400)
  });

  it('updates the ticket provided valid inputs', async () => {
    const cookie =  global.signin()
    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',cookie)
    .send({
      title:'abc',
      price:20
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
      title:'abcd',
      price:200
    })
    .expect(200)

    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

    expect(ticketResponse.body.title).toEqual('abcd')
    expect(ticketResponse.body.price).toEqual(200)
  });
})

it('publishes an event', async () =>{
  const cookie =  global.signin()
  const response = await request(app)
  .post(`/api/tickets/`)
  .set('Cookie',cookie)
  .send({
    title:'abc',
    price:20
  })

  await request(app)
  .put(`/api/tickets/${response.body.id}`)
  .set('Cookie',cookie)
  .send({
    title:'abcd',
    price:200
  })
  .expect(200)
  expect(natsWrapper.client.publish).toHaveBeenCalled()

})


