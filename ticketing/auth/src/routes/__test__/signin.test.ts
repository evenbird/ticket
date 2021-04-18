import request from 'supertest'
import {app} from '../../app'

it('fails when a email that does not exist is supplied', async ()=>{
    await request(app)
            .post('/api/users/signup')
            .send({
                email:'test@test.com',
                password:'password'
            })
            .expect(201);

    await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password:'asdfasdfa'
    })
    .expect(400)
})

it('return a 400 with an invalid email', async ()=>{
    await request(app)
            .post('/api/users/signup')
            .send({
                email:'test@test.com',
                password:'password'
            })
            .expect(201);

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(200)    
    expect(response.get('Set-Cookie')).toBeDefined()
})