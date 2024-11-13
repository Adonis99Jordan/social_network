import User from '../models/User.js';
import Thought from '../models/Thought.js';
const resolvers = {
    Query: {
        getUserById: async (_, { userId }) => {
            return User.findById(userId).populate('thoughts friends');
        },
        getAllUsers: async () => {
            return User.find().populate('thoughts friends');
        },
        getThoughtById: async (_, { thoughtId }) => {
            return Thought.findById(thoughtId).populate('reaction');
        },
        getAllThoughts: async () => {
            return Thought.find().populate('reactions');
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            return User.create({ username, email, password });
        },
        updateUser: async (_, { userId, username, email, password }) => {
            const updateData = {};
            if (username)
                updateData.username = username;
            if (email)
                updateData.email = email;
            if (password)
                updateData.password = password;
            return User.findByIdAndUpdate(userId, updateData, { new: true });
        },
        deleteUser: async (_, { userId }) => {
            return User.findByIdAndUpdate(userId);
        },
        addFriend: async (_, { userId, friendId }) => {
            return User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
        },
        removeFriend: async (_, { userId, friendId }) => {
            return User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        },
        createThought: async (_, { username, thoughtText }) => {
            const thought = await Thought.create({ username, thoughtText });
            await User.findOneAndUpdate({ username }, { $push: { thoughts: thought._id } });
            return thought;
        },
        updateThought: async (_, { thoughtId, thoughtText }) => {
            return Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
        },
        deleteThought: async (_, { thoughtId }) => {
            return Thought.findByIdAndDelete(thoughtId);
        },
        addReaction: async (_, { thoughtId, reactionBody, username }) => {
            const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: { reactionBody, username } } }, { new: true });
            return thought;
        },
        deleteReaction: async (_, { thoughtId, reactionId }) => {
            const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true });
            return thought;
        },
    }
};
export default resolvers;
