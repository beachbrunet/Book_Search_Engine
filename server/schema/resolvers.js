// SearchBooks.js:
// Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function 
// instead of the saveBook() function imported from the API file.
// Make sure you keep the logic for saving the book's ID to state in the try...catch block!

// SavedBooks.js:
// Remove the useEffect() Hook that sets the state for UserData.
// Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
// Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function 
// that's imported from API file. (Make sure you keep the removeBookId() function in place!)


// Mutations
// adding a user -- Accepts a username, email, and password as parameters; returns an Auth type.
// Login -- Accepts an email and password as parameters; returns an Auth type.
// save book -- Accepts a book author's array, description, title, bookId, image, and link as parameters;
// returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
// removeBook: Accepts a book's bookId as a parameter; returns a User type.

// refs https://www.apollographql.com/docs/react/data/mutations/

// apollo server/ resolver here
const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

// example 23 outline
const resolvers = {
    // me query
  Query: {
    me: async (parent , args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user_id}).populate("savedBooks");
            return userData;
        }
        throw new AuthenticationError ('User not logged in');
    },
  },

  Mutation: {
// adding a user me: Which returns a User type.
  addUser: async (parent, {username, email, password}) => {
       const user = await User.create({username, email, password});
       const token = signToken(user);
      return { user, token };
    },

//  login
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
    return { user, token };
  },
// saving a book (users: username, email, _id)
    saveBook: async (parent, bookData, context) => {
      // console.log(bookData);
      if (context.user) {
        const update = await User.findOneAndUpdate(
         { _id: context.user._id},
         { $push: {savedBooks: bookData}},
         {new: true,  runValidators: true }
         );
          // console.log(update);
          return update;
        }
      },
  // remove book ---not being used
       deleteBook: async (parent, {bookData}, context) => {
        if (context.user) {
          const removeBook = await User.findOneAndUpdate(
           { _id: context.user_id},
           { $pull: {savedBooks: {bookId}}},
           {new: true,  runValidators: true }
           );
           delete deleteBook;
           return deleteBook;
          }
        },
      },
};


module.exports = resolvers;
