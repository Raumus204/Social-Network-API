import { Schema, Types, Document } from 'mongoose';

interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const Reaction = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: number) => new Date(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

export { Reaction, IReaction };