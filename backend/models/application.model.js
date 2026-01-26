import mongoose from "mongoose";
const { Schema } = mongoose;

const applicationSchema = new Schema(
    {
        applicant: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }, 
        job: { 
            type: Schema.Types.ObjectId, 
            ref: 'Job',
            required:true
        },
        status: {
            type: String,
            enum: ['pending','accepted','rejected'],
            default: 'pending'
        },
    },
    {timeseries: true} 
);

export const Application = mongoose.model('Application', applicationSchema);