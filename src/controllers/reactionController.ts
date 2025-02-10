import { Response, Request } from 'express';
import { Thought } from '../models/Thought.js';

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
        );
        if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    };
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
        );
        if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    };
}