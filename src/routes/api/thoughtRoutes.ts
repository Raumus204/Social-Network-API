import { Router } from 'express';
import {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';
import { addReaction, removeReaction } from '../../controllers/reactionController.js';

const router = Router();

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as thoughtRoutes };