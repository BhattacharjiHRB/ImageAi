import { create } from "domain";
import { Schema, model, models } from "mongoose";


const transactionSchema = new Schema({
    createdAt : {
        rype: Date,
        default: Date.now
    },
    stripeId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    plan: {
        type: String,
    },
    credits: {
        type: Number,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Transaction = models.Transaction || model('Transaction', transactionSchema)

export default Transaction;