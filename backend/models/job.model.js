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
        }],
        location: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
            required: true,
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
        applications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }],
        // category: {
        //     type: String,
        //     required: true,
        // },
        // applicants: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User',
        //     },
        // ],
        // status: {
        //     type: String,
        //     enum: ['Active', 'Closed', 'On Hold'],
        //     default: 'Active',
        // },
    }
);

export const Job = mongoose.model('Job', jobSchema);