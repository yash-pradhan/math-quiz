import mongoose from "mongoose";

const userScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  additionScore: {
    type: [Number], // Specify the type as an array of numbers
    required: true,

  },
  subtractionScore: {
    type: [Number], // Specify the type as an array of numbers
    required: true,

  },
  multiplicationScore: {
    type: [Number], // Specify the type as an array of numbers
    required: true,

  },
  divisionScore: {
    type: [Number], // Specify the type as an array of numbers
    required: true,

  },
});

const userScoreModel = mongoose.model("userScore", userScoreSchema); // Provide a string as the first argument to mongoose.model

export default userScoreModel; // Export the model

