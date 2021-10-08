// apollo server/ resolver here
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// example 23 outline
const resolver = {
  Query: {
    me:async (parent , args, contect) => {
        if (context.user) {
            const userData = await User.findOne( { _id:: context.user_id}).select('-_v -password');
            return userData;
        }
        throw new AuthenticationError ('User not logged in');
    },
  },
}








// mutation add user/login/savebook

// remove book

module.exports = resolvers;
