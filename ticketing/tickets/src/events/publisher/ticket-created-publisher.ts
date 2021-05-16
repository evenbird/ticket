import Publisher from '@dzptickets/common/build/events/base-publisher'
import {Subjects,TicketCreatedEvent} from '@dzptickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated    
}

