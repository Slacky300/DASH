import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    
    description:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    image:{
        type: String,
        required: false,
        trim: true,
    },

    githubLink:{
        type: String,
        required: false,
        trim: true,
    },

    websiteLink:{
        type: String,
        required: false,
        trim: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


},{timestamps: true});

const Project = mongoose.model('Project', projectSchema);

export default Project;