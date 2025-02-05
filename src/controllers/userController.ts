import { Request, Response } from 'express';
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';

  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

    // Get a single user along with their thoughts and friends
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

    // Create a user
    export const createUser = async (req: Request, res: Response) => {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    // Update a user
    export const updateUser = async (req: Request, res: Response) => {
      try {
        const user = await User.findByIdAndUpdate(
            req.params.userId, 
            req.body,
            { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Delete a user
    export const deleteUser = async (req: Request, res: Response) => {
      try {
        const user = await User.findByIdAndDelete(
            req.params.userId,
            req.body,
            { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({message: 'User and associated thoughts deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
