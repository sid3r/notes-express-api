import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Note } from '../models/note';

const router = Router();
let notes: Note[] = [];

// validation rules
const noteValidationRules = [
  body('content').notEmpty().withMessage('Content is required'),
  body('color').notEmpty().withMessage('Color is required'),
];

// get all
router.get('/', (req: Request, res: Response) => {
  res.json(notes);
});

// create
router.post('/', noteValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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
router.put('/:id', noteValidationRules, (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note = notes.find((t) => t.id === parseInt(req.params.id));

  if (!note) {
    res.status(404).send('Note not found');
  } else {
    note.content = req.body.content || note.content;
    note.color = req.body.color || note.color;
    note.isArchived = req.body.isArchived || note.isArchived;

    res.json(note);
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
