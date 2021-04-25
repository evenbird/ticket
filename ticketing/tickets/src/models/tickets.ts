import mongoose from 'mongoose'
// import {Password} from '../services/password'
//An interface that descrbes the properties
//that are requried to create a new User
interface TicketAttrs {
    title:string;
    price:number;
    userId:String;
}

//an interface that describes the properties
//that a User Model has
//represent thw entire collection of data
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs:TicketAttrs):TicketDoc;
}

//an interface that describes the properties
//that a User Document has
//one single data
interface TicketDoc extends mongoose.Document{
    title:string;
    price:number;
    userId:String;
}

// mapping mongo db schema to our own schema
const ticketSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},
{
    toJSON:{
            transform(doc,ret){
                ret.id = ret._id
                delete ret._id
            }
    }
})

// define build function. allow type script to perform type check of the record during the build
ticketSchema.statics.build = (attrs:TicketAttrs) =>{
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema)

export {Ticket}