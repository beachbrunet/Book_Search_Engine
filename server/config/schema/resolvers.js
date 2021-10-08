// apollo server/ resolver here
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// example 23 outline
const resolver = {
    // me query
  Query: {
    me: async (parent , args, contect) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user_id}).select('-_v -password');
            return userData;
        }
        throw new AuthenticationError ('User not logged in');
    },
  },
}
// Mutations
// adding a user
// Login
// save book

Mutation: {
// adding a user
addUSer: async (parent, args)
 => {
     const user = await User.create(args);
     const token = something(user);

     return { token, user};
 }
 login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });
    
    if(!user) {
        throw new AuthenticationError ('Incorrect credentials');
    }
    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
  }
};




// example code



module.exports = resolvers;
