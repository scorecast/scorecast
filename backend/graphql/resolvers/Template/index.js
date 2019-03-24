import Template from "../../../models/Template";

export default {
  Query: {
    template: (root, args) => {
      return new Promise((resolve, reject) => {
        Template.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    templates: () => {
      return new Promise((resolve, reject) => {
        Template.find({})
          .populate()
          .exec((err, res) => {
            console.log(`RES: ${res}`);
            err ? reject(err) : resolve(res);
          });
      });
    }
  }
};
