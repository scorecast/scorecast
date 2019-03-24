import User from "../../../models/User";
import Template from "../../../models/Template";
import Game from "../../../models/Game";
import mongoose from "mongoose";

export default {
  Query: {
    game: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        Game.findOne({
          _id
        })
          .populate('admin')
          .populate('template')
          .exec((err, res) => {
            if (err) return reject(err);
            if (!res) return reject("No Game found for id");
            //console.log(JSON.stringify(res, null, 2));
            return resolve(res);
        });
      });
    },
    games: (root) => {
      console.log(JSON.stringify(root.session, null, 2));

      return new Promise((resolve, reject) => {
        Game.find({})
          .populate('admin')
          .populate('template')
          .exec((err, res) => {
            if (err) return reject(err);
            if (!res) return reject("No games found");
            //console.log(JSON.stringify(res, null, 2));
            return resolve(res);
          });
      });
    }
  },
  Mutation: {
    addGame: (root, { template, admin }) => {
        return new Promise((resolve, reject) => {
          const newGame = new Game({
            admin,
            template,
            variables: []
          });
          newGame
            .save((err, res) => {
              return Game.findOne({_id: res._id})
                .populate('admin')
                .populate('template')
                .exec((err, res) => {
                if (err) return reject(err);
                if (!res) return reject("Failed to save Game");

                //res = res.toObject();
                //console.log(JSON.stringify(res, null, 2));
                return resolve(res);
              });
            });
        });
    },

    editGame: (root, { _id, key, value }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id }, { $set: { key, value } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },

    deleteGame: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
