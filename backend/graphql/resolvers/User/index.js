// The User schema.
import User from "../../../models/User";
import mongoose from "mongoose";

export default {
  Query: {
    user: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        User.findOne({
          _id
        }).exec((err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            if (err) return reject(err);
            resolve(res);
          });
      });
    }
  },
  Mutation: {
    addUser: (root, { name, email }) => {
      const newUser = new User({
        name,
        email
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    },
    editUser: (root, { _id, name, email }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id }, { $set: { name, email } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
