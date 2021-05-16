import Listener from './base-listener'
import { Message } from 'node-nats-streaming';
import { Subjects} from './subjects'
import {TicketCreatedEvent} from './ticket-created-event'
import Publisher from './base-publisher'


class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;    
}

export default TicketCreatedPublisher