let logic = {
    name: 'Die',
    variables: [{
        name: 'gameName',
        type: 'String'
    },{
        name: 'aName',
        type: 'String'
    },{
        name: 'bName',
        type: 'String'
    },{
        name: 'aScore',
        type: 'Int'
    },{
        name: 'bScore',
        type: 'Int'
    },{
        name: 'winScore',
        type: 'Int',
        value: 'if(or(gt(<aScore>,5),gt(<bScore>,5)),1,0)'
    },{
        name: 'winTeam',
        type: 'String',
        value: 'if(gt(<aScore>,5),<aName>,<bName>)'
    },],
    actions: [{
        name: 'aPlus',
        variable: 'aScore',
        value: 'add(<aScore>,1)',
    },{
        name: 'bPlus',
        variable: 'bScore',
        value: 'add(<bScore>,1)',
    },{
        name: 'aMinus',
        variable: 'aScore',
        value: 'add(<aScore>,-1)',
    },{
        name: 'bMinus',
        variable: 'bScore',
        value: 'add(<bScore>,-1)',
    }],
    winCondition: 'winScore',
    winText: 'concat(<winTeam>,\' Wins!\')',
    setup: [{
        name: 'gameName',
        lock: true
    },{
        name: 'aName',
        lock: false
    },{
        name: 'bName',
        lock: false
    }]
};

export { logic };
