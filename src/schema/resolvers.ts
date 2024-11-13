import User from '../models/User.js';
import Thought from '../models/Thought.js';

const resolvers = {
  Query: {
    getUserById: async (_: any, { userId }: { userId: string }) => {
      return User.findById(userId).populate('thoughts friends')
    },
    getAllUsers: async () => {
      return User.find().populate('thoughts friends')
    },
    getThoughtById: async (_: any, { thoughtId }: { thoughtId: string }) => {
      return Thought.findById(thoughtId).populate('reaction');
    },
    getAllThoughts: async () => {
      return Thought.find().populate('reactions');
    },
  },

  Mutation: {
    createUser: async (_: any, { username, email, password }: { username: string, email: string, password: string}) => {
      return User.create({ username, email, password });
    },
    updateUser: async (_:any, { userId, username, email, password }: { userId: string, username?: string, email?: string, password?: string}) => {
      const updateData: any = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
        return User.findByIdAndUpdate(userId, updateData, { new: true });
    },
    deleteUser: async (_: any, { userId }: { userId: string}) => {
      return User.findByIdAndUpdate(userId);
    },
    addFriend: async (_: any, { userId, friendId }: { userId: string, friendId: string }) => {
      return User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
    },
    removeFriend: async (_: any, { userId, friendId }: { userId: string, friendId: string }) => {
      return User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
    },
    createThought: async (_: any, { username, thoughtText }: { username: string, thoughtText: string}) => {
      const thought = await Thought.create({ username, thoughtText });
      await User.findOneAndUpdate({ username }, { $push: { thoughts: thought._id } });
      return thought;
    },
    updateThought: async (_: any, { thoughtId, thoughtText }: { thoughtId: string, thoughtText: string }) => {
      return Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true});
    },
    deleteThought: async (_: any, { thoughtId }: { thoughtId: string}) => {
      return Thought.findByIdAndDelete(thoughtId);
    },
    addReaction: async (_: any, { thoughtId, reactionBody, username }: { thoughtId: string, reactionBody: string, username: string }) => {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username }}},
        { new: true }
      );
      return thought;
    },
    deleteReaction: async (_: any, { thoughtId, reactionId }: { thoughtId: string, reactionId: string }) => {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId}}},
        { new: true }
      );
      return thought;
    },
  }
};

export default resolvers;