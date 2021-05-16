import Publisher from '@dzptickets/common/build/events/base-publisher'
import {Subjects, TicketUpdatedEvent} from '@dzptickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated    
}