
var doData = function(event){
    id= bud.getPath(event)[1].id;
    console.log(document.getElementById(id+'text').innerText);
};

var remove = function(event){
    parent = bud.getPath(event)[2];
    el = bud.getPath(event)[1];
    console.log('remove', el);
    parent.removeChild(el);
}

var additem = function(event){
    el = document.getElementById('ita');
    text = el.value;
    console.log(text);
    list = document.getElementById('list').additem(text);
}


var printider = function(event){
    console.log(event.target.parentNode.ider());
}
var data = ["e", "a", 'b','f', 'c', 'd', ];

var template= function (data){
    return bud.create(
        {'<>':'li', 'c':[
            {'<>':'div', '_id':'text','class':'text','text':data},
            {'<>':'button', '_id':"remove", 'text':'remove', 'onclick':remove},
            {'<>':'button', '_id':"doData", 'text':'print', 'onclick':doData},
            {'<>':'button', '_id':"doData", 'text':'printider', 'onclick':printider},
            ], 'ider' : function (d){return data}
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




