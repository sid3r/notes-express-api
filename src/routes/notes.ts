import { Router, Request, Response } from 'express';
import { Note } from '../models/note';

const router = Router();
let notes: Note[] = [];

// get all
router.get('/', (req: Request, res: Response) => {
  res.json(notes);
});

// create
router.post('/', (req: Request, res: Response) => {
  const note: Note = {
    id: notes.length + 1,
    content: req.body.content,
    color: req.body.color,
    isArchived: false,
  };

  notes.push(note);
  res.status(201).json(note);
});

// get one by id
router.get('/:id', (req: Request, res: Response) => {
  const note = notes.find((t) => t.id === parseInt(req.params.id));

  if (!note) {
    res.status(404).send('Note not found');
  } else {
    res.json(note);
  }
});

// update
router.put('/:id', (req: Request, res: Response) => {
  const note = notes.find((t) => t.id === parseInt(req.params.id));

  if (!note) {
    res.status(404).send('Note not found');
  } else {
    task.content = req.body.content || task.content;
    task.color  req.body.color || task.color;
    task.isArchived = req.body.isArchived || task.isArchived;

    res.json(task);
  }
});

// delete
router.delete('/:id', (req: Request, res: Response) => {
  const index = notes.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send('Note not found');
  } else {
    notes.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
