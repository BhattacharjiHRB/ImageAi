import { Schema, model, models } from "mongoose";



const UserSchema = new Schema({

    clerkId : { 
        type: String, 
        required: true, 
        unique: true 
    },
    email : { 
        type: String, 
        required: true , unique: true 
    },
    firstName : { 
        type: String 
    },
    lastName : { 
        type: String 
    },
    userName : { 
        type: String, 
        required: true, 
        unique: true 
    },
    photo : { 
        type: String, 
        required: true
    },
    planId : { 
        type: String, 
        required: true , 
        default:1
    },
    creditBal: { 
        type: Number, 
        required: true,
        default: 10 
    },
})


const User = models?.User || model('User' , UserSchema);

export default User;