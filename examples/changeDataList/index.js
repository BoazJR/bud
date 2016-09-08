
var doData = function(event){
    id= bud.getPath(event)[1].id;
    console.log(document.getElementById(id+'text').innerText);
};

var remove = function(event){
    parent = bud.getPath(event)[2];
    el = bud.getPath(event)[1];
    parent.removeChild(el);
}

var additem = function(event){
    el = document.getElementById('ita');
    item = generateData(el.value);
    document.getElementById('list').updateItem(item);
}


var printider = function(event){
    console.log(event.target.parentNode.ider());
}
var generateData  = function(i){
    return {'id':i, 'visible':'item'+i, 'hidden':'hidden'+i};
}
var data = [
    generateData(1),
    generateData(2),
    generateData(3),
    generateData(4),
]

var template= function (data){
    return bud.create(
        {'<>':'li', 'c':[
            {'<>':'div', '_id':'text','class':'text','text':data.visible},
            {'<>':'button', '_id':"remove", 'text':'remove', 'onclick':remove},
            {'<>':'button', '_id':"doData", 'text':'print', 'onclick':doData},
            {'<>':'button', '_id':"printIder", 'text':'printider', 'onclick':printider},
            ], 'ider' : function (d){return data.id}
        }
    );
}

bud.create({'inId':'body', 'c':[ 
        {'<>':'div', 'c':[
            {'<>':"ul", 'id':'list','data':data, 't':template},
            {'<>':'input', 'type':'text','id':'ita'},
            {'<>':'button', 'id':'addItem','text':"add item", 'onclick':additem},
        ]}
    ]}
);




