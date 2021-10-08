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
//  returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
// removeBook: Accepts a book's bookId as a parameter; returns a User type.




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



Mutation: {
// adding a user me: Which returns a User type.
addUSer: async (parent, args)
 => {
     const user = await User.create(args);
     const token = signToken(user);

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
  },
// saving a book
    saveBook: async (bookData, context) => {
      if (context.user) {
        const update = await User.findOneAndUpdate(
         { _id: context.user_id},
         { $push: {savedBooks: bookData}},
         {new: true,  runValidators: true }
         );
          console.log(update);
          return update;
        }
      },











};




// example code



module.exports = resolvers;
