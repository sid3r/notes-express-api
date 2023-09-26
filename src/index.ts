import express, { Request, Response, NextFunction } from 'express';
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

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})