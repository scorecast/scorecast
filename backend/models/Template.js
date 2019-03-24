import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the User Schema.
const TemplateSchema = new Schema({
  logic: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  view: {
    type: String,
    required: true
  }
});

const Template = mongoose.model("Template", TemplateSchema);

export default Template;
