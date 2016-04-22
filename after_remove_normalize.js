Element.prototype.after = function () {
    var frag = new DocumentFragment
    var reg = /^<\w+>$/i
    for(var node of arguments){
        if(typeof node == 'string') {
            node = reg.test(node)
                ?node = this.ownerDocument.createElement(node.slice(1,-1))
                :node = new Text(node)
        }
        frag.appendChild(node)
    }
    this.parentNode.insertBefore(frag,this)
}

/////////////////////////////////////////////////////////////////////////////

Element.prototype.rem = function() {
    if (this.parentNode ) this.parentNode.removeChild(this)
}

/////////////////////////////////////////////////////////////////////////////

Node.prototype.norma = function () {
    var nodelist =this.childNodes
    for (var i=0;i<nodelist.length;i++){
        if(nodelist[i].nodeType == 3 && (nodelist[i].nextSibling && nodelist[i].nextSibling.nodeType==3)){
                nodelist[i].nextSibling.textContent=nodelist[i].textContent+nodelist[i].nextSibling.textContent
                this.replaceChild(nodelist[i].nextSibling,nodelist[i])
                i--
        }
        else{
            nodelist[i].norma()
        }
    }
}