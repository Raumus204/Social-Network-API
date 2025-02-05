import { Router } from 'express';
import { 
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export { router as userRoutes };