import { Request, Response } from 'express';
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId, 
        req.body,
        { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { thoughts: thought._id } },
        );
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}