import request from 'supertest'
import {app} from '../../app'
import {Ticket} from '../../models/tickets'

it('has a route handler listening to /api/tickets for post requestes', async () =>{
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).not.toEqual(404);
})

it('can only be accessed if the user is signed in', async () =>{
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).toEqual(401);
})

it('return 200 if the user is signed in', async () =>{
    const response = await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({})
    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () =>{
    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title:'',
        price:10
    })
    .expect(400);

    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        price:10
    })
    .expect(400);
})

it('returns an error if an invalid price is provided', async () =>{
    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title:'',
        price: -10
    })
    .expect(400);

    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title: ''
    })
    .expect(400);
})

it('creates a ticket with valid inputs', async () =>{
   // add in check to make sure a ticket was saved
   let tickets = await Ticket.find({});
   expect(tickets.length).toEqual(0);

    await request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title: 'abc',
        price: 10
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(10);

})