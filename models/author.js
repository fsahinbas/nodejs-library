import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
});
const Author = mongoose.model("Author", authorSchema);
export default Author;
