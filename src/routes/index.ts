import { Request, Response, Router } from "express";
import User from "../models/User.js";
const router = Router();


// Get all users
router.get('/api/users', async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unkown error occured' });
        }
    }
});

// Get a user by ID
router.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err: any) {
        // if (err instanceof Error) {
        res.status(500).json({ error: err.message });
        // } else {
        //     return res.status(500).json({ error: 'An unkown error occured' });
        // }
    }
});

// Create a new user
router.post('/api/users', async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unkown error occured' });
        }
    }
});

// Update a user by ID
router.put('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ error: 'User not found ' });
        }
        res.json(user);
    } catch (err: any) {
        // if (err instanceof Error) {
        res.status(500).json({ error: err.message });
        // } else {
        //     res.status(500).json({ error: 'An unkown error occured' });
        // }
    }
});

// Delete a user By ID
router.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found ' });
        }
        res.json({ message: 'User deleted' });
    } catch (err: any) {
        // if (err instanceof Error) {
        res.status(500).json({ error: err.message });
        // } else {
        //     res.status(500).json({ error: 'An unkown error occured' });
        // }
    }
});


// Add a friend
router.put('/api/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } });

        if (!user) {
            res.status(404).json({ error: 'User or friend not found' });
        }
        res.status(200).json(user);
    } catch (err) {

        res.status(500).json({ error: 'An unkown error occured' });

    }
});

// Remove friend
router.put('/api/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } });

        if (!user) {
            res.status(404).json({ error: 'user or friend not found'});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'An unknown error occurred'})
    }
});

export default router;