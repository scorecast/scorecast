import mongoose from "mongoose";

const Schema = mongoose.Schema;

const varSchema = new Schema({

});

const GameSchema = new Schema({
  admin: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true
  },
  variables: [{
    type: String,
    required: true
  }],
  template: {
    type: mongoose.ObjectId,
    ref: 'Template',
    required: true
  }
});

const Game = mongoose.model("Game", GameSchema);

export default Game;
