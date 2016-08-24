
var bud =function(){ 
    var b = {}
    var elementCount = 0;
    b.create = function(data){
        if (!data){return} 
        //stores the html node
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
            
            if (data._id){
                data.id = data.parentid+data._id;
            } 
            if (!data.id){
                data.id = 'genid'+elementCount+"_";
                elementCount++;
            }
            node.id = data.id;
        }
        
        if (data.onclick){
            node.onclick = data.onclick;
        }
        if (data.c){
            for (var i=0;i<data.c.length;i++){
                data.c[i].parentid= node.id;
                node.appendChild(b.create(data.c[i]));
            }  
        }
        if (data.text){
            text = document.createTextNode(data.text);
            node.appendChild(text);
        }
        // create template
        if (data.t){
            node.additem =function(d){ 
                node.appendChild(data.t(d));
            }
            if (data.data){
                for (var i = 0; i<data.data.length;i++){
                    node.additem(data.data[i]);
                }
            }
        }
        if (data.class){
            node.className += " "+ data.class;
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

