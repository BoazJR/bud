


var click = function(event){
    console.log(event.toElement.innerText);
};

bud.create({'inId':'body', 'c':[ 
        {'<>':'div', 'id':'files','c':[
            {'<>':"ul", 'c':[
                {'<>':'li', 'text':'first item', "onclick":click},
                {'<>':'li', 'text':'second item', "onclick":click},
                {'<>':'li', 'text':'third item', "onclick":click}
            ]}
        ]}
    ]}
);


