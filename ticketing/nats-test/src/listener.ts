import nats,{Message, Stan} from 'node-nats-streaming';
import {randomBytes} from 'crypto'
import TicketCreatedListerner from './events/ticket-created-listener';

console.clear()

// randomBytes(4).toString('hex') incase we need two or more listeners, so we need to create new id
const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
})

stan.on('connect',()=>{
    console.log('Listener connected to NATS');

    // to close a connection if we intentionaly do so
    stan.on('close',()=>{
        console.log('NATS connection closed');
        process.exit()
    })

    new TicketCreatedListerner(stan).listen();
})

process.on('SIGINT',()=> stan.close()) // forcely close the process
process.on('SIGTERM',()=> stan.close())



