import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Template from "./Template/";
import Game from "./Game/";

const resolvers = [User, Template, Game];

export default mergeResolvers(resolvers);
