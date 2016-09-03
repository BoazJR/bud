var bud =function(){ 
    "use strict";
    var b = {};
    var elementCount = 0;
    var removeAllChildren = function(node){ 
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        } 
    }
    //
    //  inId is the base parent id  
    //  <> is the node type, default is div
    //  ider id generation for the item (given it's data)
    //  _id appended to base item id for easy reference ie: baseItemId+"_"+_id
    //  onclick ...
    //  c children data used to create children
    //  t function for template generation
    //  text ... create child text node
    //  class ...
    
    b.create = function(data){
        if (!data){return} 
        //stores the html node
        if (data.id && data._id){
            console.error('both id and _id are defined', data.id);
        }
        var node;
        //inId is the id of the base object
        if (data.inId && data.inId!=""){
            node = document.getElementById(data.inId);
        }
        // if the node doesn't exit create one 
        if (!node){
            if (!data['<>']){
                data['<>'] = 'div';
            }
            node = document.createElement(data["<>"]);
            if (!data.ider){
                if (data.id){
                    node.ider = function(){return data.id;}
                }
                else if (data._id){
                    var id = data.parentid+data._id;
                    node.ider = function(){return id;} 
                } 
                if (!node.ider){
                    var count = elementCount;
                    elementCount++;
                    node.ider = function(data){return 'genid'+elementCount+"_";};
                }
            }else{
                node.ider = data.ider;
            }
            node.id = node.ider(data);
        }
        if (data.style){
            for (var s in data.style){
                node.style[s] = data.style[s];
            }
        } 
        if (data.onclick){
            node.onclick = data.onclick;
        }
        if (data.clear){
            removeAllChildren(node);            
        }
        if (data.c){
            for (var i=0;i<data.c.length;i++){
                data.c[i].parentid= node.id;
                node.appendChild(b.create(data.c[i]));
            }  
        }
        if (data.text){
            var text = document.createTextNode(data.text);
            node.appendChild(text);
        }
        // create template
        if (data.t){
            // if node exists it replaces it otherwise it creates a new one
            node.additem =function(d){ 
                var n = data.t(d);
                var newid = n.id;
                var el = document.getElementById(newid);
                if (el){
                    if(!el.isEqualNode(n)){
                        el.parentNode.replaceChild(n, el);
                    }
                }else{
                    node.appendChild(n);
                }
            }
            if (data.data){
                for (var i = 0; i<data.data.length;i++){
                    node.additem(data.data[i]);
                }
            }
        }
        if (data.className){
            node.className += " "+ data.className;
        }
        return node;
    }

    

    // helpers
    b.getPath = function(event, depth){
        var path = [];
        var node = event.target;
        while(node != document.body &&(!depth || depth>0)) {
            path.push(node);
            node = node.parentNode;
            if (depth){
                depth--;
            }
        }
        return path;
    }
    b.gid = function(id){
        return document.getElementById(id); 
    }
    b.sort = function(id, func){
        var list = document.getElementById(id);
        var items = list.children;
        var itemsArr = [];
        for (var i =0;i<items.length;i++){
            itemsArr.push(items[i]);
        }
        if (func){
            itemsArr.sort(func);
        }else{
            itemsArr.sort(function(a, b) {
                return a.innerHTML == b.innerHTML
                    ? 0
                    : (a.innerHTML > b.innerHTML ? 1 : -1);
                }
            );
        }//TODO optimize append??
        for (i = itemsArr.length-1; i>=0 ; i--) {
            list.appendChild(itemsArr[i]);
        } 
    }
    b.comperator = function(access){
        return function(a,b){
            return access(a) == access(b)?0
                : access(a) < access(b);
        }
    }
    return b; 
}();

