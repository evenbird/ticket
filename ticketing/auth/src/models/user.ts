import mongoose from 'mongoose'
import {Password} from '../services/password'
//An interface that descrbes the properties
//that are requried to create a new User
interface UserAttrs {
    email:string;
    password:string;
}

//an interface that describes the properties
//that a User Model has
//represent thw entire collection of data
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc;
}

//an interface that describes the properties
//that a User Document has
//one single data
interface UserDoc extends mongoose.Document{
    email:string
    password:string    
}

// mapping mongo db schema to our own schema
const userSchema = new mongoose.Schema(
{
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
},
{
    toJSON:{
            transform(doc,ret){
                ret.id = ret._id
                delete ret._id
                delete ret.password
                delete ret.__v
            }
    }
})

// pre save hook
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed =await Password.toHash(this.get('password'))
        this.set('password',hashed)
    }
    done()
})

// define build function. allow type script to perform type check of the record during the build
userSchema.statics.build = (attrs:UserAttrs) =>{
    return new User(attrs)
}

const User = mongoose.model<UserDoc,UserModel>('User', userSchema)

export {User}