import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomUser, getRandomThought } from './data.js';

const seedDatabase = async () => {
  try {
    await db();
    await cleanDB();

    // Generate users
    const users = Array.from({ length: 5 }, () => getRandomUser());
    const userData = await User.create(users);

    // Generate thoughts for each user
    const thoughts = userData.map(user => getRandomThought(user.username));
    const thoughtData = await Thought.create(thoughts);

    // Link thoughts to users
    for (const thought of thoughtData) {
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      );
    }
    

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
