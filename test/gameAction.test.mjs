import { Operation, Value } from '../config/gameAction';

//let o = new Operation('<varName>');
let o = new Operation('or(gte(<aScore>,5),gte(<bScore>,5))');

console.log(o.toString());
console.log(o.evaluate({
    aScore: 1,
    bScore: 4
}));
