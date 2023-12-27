import Project from "../models/projects.js";

const createProject = async (req, res) => {
    const { title, description, image, githubLink, websiteLink } = req.body;
    const createdBy = req.user.id;
    const project = new Project({ title, description, image, githubLink, websiteLink, createdBy });
    try {
        await project.save();
        return res.status(201).json({ project, message: "Project created!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUserProjects = async (req, res) => {
    const createdBy = req.user.id;
    try {
        const projects = await Project.find({ createdBy }).populate("createdBy", "username");
        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateProject = async (req, res) => {

    const { id } = req.params;
    const { title, description, image, githubLink, websiteLink } = req.body;
    const createdBy = req.user.id;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { title, description, image, githubLink, websiteLink, createdBy }, { new: true });
        if (updatedProject) {
            return res.status(200).json({ project: updatedProject, message: "Project updated!" });
        }
        throw new Error("Project not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Project.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ message: "Project deleted" });
        }
        throw new Error("Project not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getSingleProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id).populate("createdBy", "username");
        if (project) {
            return res.status(200).json({ project });
        }
        throw new Error("Project not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export { createProject, getUserProjects, updateProject, deleteProject, getSingleProject};