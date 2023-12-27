import express from 'express';

import { createProject, getUserProjects, updateProject, deleteProject, getSingleProject } from '../controllers/project.js';
import validateToken from '../middlewares/isLoggedIn.js';

const projectRouter = express.Router();

projectRouter.route('/').get(validateToken, getUserProjects).post(validateToken, createProject);
projectRouter.route('/:id').get(getSingleProject).put(validateToken, updateProject).delete(validateToken, deleteProject);

export default projectRouter;