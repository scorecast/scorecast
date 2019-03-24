import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Template from "./Template";
import Game from "./Game";

const typeDefs = [User, Template, Game];

export default mergeTypes(typeDefs, { all: true });
