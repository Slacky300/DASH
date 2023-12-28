import express from 'express';
import dbConnect from './utils/dbConnect.js';
import cors from 'cors';
import userRouter from './routes/user.js';
import projectRouter from './routes/project.js';

const app = express();
const PORT = process.env.PORT || 8000;




app.use(express.json());

app.use(cors());


const startServer = async () =>  {
  await dbConnect();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();


app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

