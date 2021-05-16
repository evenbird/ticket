import Listener from './base-listener'
import { Message } from 'node-nats-streaming';
import { Subjects} from './subjects'
import {TicketCreatedEvent} from './ticket-created-event'


class TicketCreatedListerner extends Listener<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;    
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data); 
        msg.ack()  
    }
}

export default TicketCreatedListerner