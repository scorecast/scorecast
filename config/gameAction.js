class Evaluateable {
    evaluate(variables) {
    }
}

class Operation extends Evaluateable{
    constructor(str) {
        super();
        str = "" + str;
        let openIndex = str.indexOf('(');                                        // open paren
        //console.log(`openIndex: ${openIndex}`);

        if (openIndex === -1) {
            //No parentheses, is a Value

            //Return object by reference (https://stackoverflow.com/a/3350307)
            return new Value(str);
        }
        let opPart = str.substring(0, openIndex);
        let argPart = str.substring(openIndex + 1, str.length - 1);      // -1 for close paren

        /*
        * Parentheses Matcher
        * Needed to split operands only on top-level commas
        * side-effect: argStrings contains operands as strings
        * */
        let parenStack = 0;
        let argStrings = [];
        let currentStart = 0;
        for (let i = 0; i < argPart.length; i++) {
            if (argPart[i] === '(') {
                parenStack++;
            } else if (argPart[i] === ')') {
                parenStack--;
            }
            if (argPart[i] === ',') {
                //Only split if stack length is 0
                if (parenStack === 0) {
                    argStrings.push(argPart.substring(currentStart, i));
                    currentStart = i + 1;
                }
                //Handle last character
                if (i === (argPart.length - 1)) {
                    let last = argPart.substring(currentStart, i);
                    //Prevent double comma
                    if (last !== '') {
                        argStrings.push();
                    }
                }
            } else {
                //Handle last character
                if (i === (argPart.length - 1)) {
                    argStrings.push(argPart.substring(currentStart, i + 1));
                }
            }
        }

        let args = argStrings.map((aStr) => {
            return new Operation(aStr);
        });
        this.operation = opPart;
        this.operands = args;
    }

    evaluate(variables) {
        switch (this.operation) {
            case 'if':
                return (this.operands[0].evaluate(variables) !== 0) ?
                    this.operands[1].evaluate(variables):
                    this.operands[2].evaluate(variables);
            case 'or':
                // console.log(this.operands[0].evaluate(variables));
                // console.log(this.operands[1].evaluate(variables));
                // console.log((this.operands[0].evaluate(variables) !== 0) || (this.operands[1].evaluate(variables) !== 0));
                return ((this.operands[0].evaluate(variables) !== 0) || (this.operands[1].evaluate(variables) !== 0)) ?
                    1:
                    0;
            case 'and':
                return ((this.operands[0].evaluate(variables) !== 0) && (this.operands[1].evaluate(variables) !== 0)) ?
                    1:
                    0;
            case 'eq':
                return ((this.operands[0].evaluate(variables)) === (this.operands[1].evaluate(variables))) ?
                    1:
                    0;
            case 'gt':
                return ((this.operands[0].evaluate(variables)) > (this.operands[1].evaluate(variables))) ?
                    1:
                    0;
            case 'lt':
                return ((this.operands[0].evaluate(variables)) < (this.operands[1].evaluate(variables))) ?
                    1:
                    0;
            case 'gte':
                return ((this.operands[0].evaluate(variables)) >= (this.operands[1].evaluate(variables))) ?
                    1:
                    0;
            case 'lte':
                return ((this.operands[0].evaluate(variables)) <= (this.operands[1].evaluate(variables))) ?
                    1:
                    0;
            case 'add':
                return (this.operands[0].evaluate(variables)) + (this.operands[1].evaluate(variables));
            case 'mul':
                return (this.operands[0].evaluate(variables)) * (this.operands[1].evaluate(variables));
            case 'concat':
                return '' + (this.operands[0].evaluate(variables)) + (this.operands[1].evaluate(variables));
            default:
                return this.toString();
        }
    }

    toString() {
        return `Operation[${this.operation}, [${this.operands.map((o) => {
            return o.toString();
        })}]]`;
    }
}

class Value extends Evaluateable{
    constructor(str) {
        super();

        //Handle Int literals
        let intVal = parseInt(str);
        if (!isNaN(intVal)) {
            this.val = intVal;
            this.type = 'Int';
            return;
        }

        //Handle String literals
        if (str.includes('\'')) {
            this.type = 'String';
        } else {
            this.type = 'Var';
        }
        this.val = str.substring(1, str.length - 1);
    }

    evaluate(variables) {
        switch (this.type) {
            case 'Int':
                return this.val;
            case 'String':
                return this.val;
            case 'Var':
                return variables[Object.keys(variables).find((k) => {
                    return this.val === k;
                })];
            default:
                return this.val;
        }
    }

    toString() {
        switch (this.type) {
            case 'Int':
                return this.val;
            case 'String':
                return '\'' + this.val + '\'';
            case 'Var':
                return '<' + this.val + '>';
            default:
                return this.val;
        }
    }
}

export { Evaluateable, Operation, Value };
//export default GameAction;
