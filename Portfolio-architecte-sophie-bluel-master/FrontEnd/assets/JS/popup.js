function popup(id){
    // dont do var Popup = this;
    this.id = id;
    if (document.getElementById('popup-mask') != null) {
        divmask = document.getElementById('popup-mask');
    }else{
        var divmask = document.createElement('div');
        divmask.id = 'popup-mask';
        style = "position:fixed;left:0px;top:0px;right:0px;bottom:0px;"
        style += "width:100%;height:100%;z-index:999;";
        divmask.style = style;
        document.body.appendChild(divmask);
    }
    this.checkdiv = function(id){
        if (document.getElementById(id) == null) { return; }
        this.the_div = document.getElementById(id);
        style = "position:fixed;margin: auto;left: 0;right: 0;"
        style += "z-index:10000;";
        this.the_div.style = style;
        this.the_div.style.zIndex = "10000";
        this.the_div.hidden = true;
        divmask.hidden = true;
    }
    this.pop = function(){
        this.checkdiv(this.id);
        this.the_div.hidden = false;
        divmask.hidden = false;
    }
    this.close = function(){
        this.checkdiv(this.id);
        this.the_div.hidden = true;
        divmask.hidden = true;
    }
    this.checkdiv(this.id);
}
