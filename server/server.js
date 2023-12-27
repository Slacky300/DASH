import express from 'express';
import dbConnect from './utils/dbConnect.js';
import cors from 'cors';
import userRouter from './routes/user.js';
import projectRouter from './routes/project.js';

const app = express();
const PORT = process.env.PORT || 8000;




app.use(express.json());

app.use(cors());


const startServer = () =>  app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

startServer();


app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);

