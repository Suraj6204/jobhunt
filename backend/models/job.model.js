import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: [{
            type: [String],
            required: true,
        }],
        salary: {
            type: Number,
            required: true,
        },
        experience:{
            type:Number,
            required:true,
        },
        location: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
            required: true,
        },
        position: {
            type: Number,
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        created_by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        //shows total no. of applications for this job
        applications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }],
        // status: {
        //     type: String,
        //     enum: ['Active', 'Closed', 'On Hold'],
        //     default: 'Active',
        // },
    },
    { timestamps: true } //for showing - 5 days ago
);

export const Job = mongoose.model('Job', jobSchema);