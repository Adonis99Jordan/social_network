import { Router } from "express";
import Thought from "../models/Thought.js";
const router = Router();
// Get all thoughts
router.get('/api/thoughts', async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unkown error occured' });
        }
    }
});
// Get thought by ID
router.get('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ error: 'thought not found' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Create a new thought
router.post('/api/thoughts', async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();
        res.status(201).json(savedThought);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unkown error occured' });
        }
    }
});
// Update thought by ID
router.put('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought not found ' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete thought By ID
router.delete('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id);
        if (!thought) {
            res.status(404).json({ error: 'Thought not found ' });
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Post Reaction to thought
router.post('/api/thoughts/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought not found ' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete reaction from thought
router.delete('/api/thoughts/:id/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought or reaction not found ' });
        }
        else {
            res.json({ messsage: 'Reaction deleted', thought });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export { router as thoughtRouter };
