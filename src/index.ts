import express, { Request, Response } from 'express';
//import taskRoutes from './routes/tasks';
import notesRoutes from './routes/notes';

const app = express();
const port = process.env.PORT || 3000;

// enable JSON
app.use(express.json());

// taks routes
//app.use('/tasks', taskRoutes);

// notes routes
app.use('/notes', notesRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})