var data = [
    {
        type : "zone1" , sections : [
            {
                type : "servers",
                name : "Name servers",
                list : [
                    {"name" : "name server"},
                    {"name" : "name server"},
                    {"name" : "name server"}
                ]
            },
            {
                type : "registrant",
                name : "Registrant contact",
                list : [
                    {"name" : "Contact1"},
                    {"name" : "Contact2"}
                ]
            },
            {
                type : "technical",
                name : "Technical contact",
                list : [
                    {"name" : "Contact1"},
                    {"name" : "Contact2"},
                    {"name" : "Contact3"}
                ]
            }
        ]
    },
    {
        type : "zone2" ,
        sections : [
            {
                type : "servers",
                name : "Name servers",
                list : [
                    {"name" : "name server"},
                    {"name" : "name server"},
                    {"name" : "name server"}
                ]
            },
            {
                type : "registrant",
                name : "Registrant contact",
                list : [
                    {"name" : "Contact1"},
                    {"name" : "Contact2"}
                ]
            },
            {
                type : "technical",
                name : "Technical contact",
                list : [
                    {"name" : "Contact4"},
                    {"name" : "Contact5"},
                    {"name" : "Contact6"}
                ]
            }
        ]
    },
    {
        type : "zone2" ,
        sections : [
            {
                type : "servers",
                name : "Name servers",
                list : [
                    {"name" : "name server"},
                    {"name" : "name server"},
                    {"name" : "name server"}
                ]
            },
            {
                type : "registrant",
                name : "Registrant contact",
                list : [
                    {"name" : "Contact1"},
                    {"name" : "Contact2"}
                ]
            },
            {
                type : "technical",
                name : "Technical contact",
                list : [
                    {"name" : "Contact7"},
                    {"name" : "Contact8"},
                    {"name" : "Contact9"}
                ]
            }
        ]
    }
]

function ResourceDialog() {
    this.wrapper = $('.dialog');
    this.resources = $('#resourceValue');
    this.saveBtn = $('#addBtn');
    this.cancelBtn = $('#cancelBtn');
    this._bind();
}
ResourceDialog.prototype = {
    show : function(dom, callback, context) {
        this.resources.val('');
        this.wrapper.show();
        this.resources.focus();
        this.successCallback = callback;
        this.callContext = context;
        this.setPositionByDom(dom);
    },
    hide : function() {
        this.wrapper.hide();
    },
    setPositionByDom:function(dom) {
        var position = $(dom).position();
        this.wrapper.css({left:position.left,top:position.top});
    },
    _bind:function() {

        var self = this;

        self.saveBtn.unbind('click').bind('click', function() {
            self.save();
        });

        self.cancelBtn.unbind('click').bind('click', function() {
            self.cancel();
        });

        $(window).unbind('keydown').bind('keydown', function(e) {
            if (self.wrapper.css('display') == 'none') {
                return;
            }
            var code = e.keyCode;
            switch (code) {
                case 13:
                    self.save();
                    break;
                case 27:
                    self.cancel();
                    break;
            }
        })
    },
    save : function() {
        var self = this;
        self.successCallback.call(self.callContext, self.resources.val());
        self.cancel();
    },
    cancel : function() {
        this.hide();
    }
}

function ZoneManager (options){
    this.config = $.extend({
        data : [
            {
                type : "zone1" ,
                sections : [
                    {
                        type : "servers",
                        name : "Name servers",
                        list : [
                            {"name" : "name server"}
                        ]
                    },
                    {
                        type : "registrant",
                        name : "Registrant contact",
                        list : [
                            {"name" : "Contact2"}
                        ]
                    },
                    {
                        type : "technical",
                        name : "Technical contact",
                        list : [
                            {"name" : "Contact1"},
                        ]
                    }
                ]
            }
        ]
    }, options || {});

    this._render();

}
ZoneManager.prototype = {
    _render : function(){
        var zoneList = $(".zone-list");
        $.each(this.config.data,function(index,item){
            var zoneDom = $('<li><h2>Sample domain '+item.type+'</h2></li>');
            zoneList.append(zoneDom);
            $.each(item.sections,function(i,d){
                new ZoneSection({
                    wrapper: zoneDom,
                    data: d
                });
            });
        });
    }
};

function ZoneSection (options){

    this.config = $.extend({
        wrapper : $('body'),
        data : {
            type : "servers",
            name : "Servers name",
            list : [
                {"name" : "name server"}
            ]
        }
    },options || {});
    this._render();

}
ZoneSection.prototype = {

    _render : function(){
        this.$parent = $('<section><h3>'+this.config.data.name+'</h3><ul class="list"></ul><input type="button" value="add" id="dataAdd" /></section>');
        var itemsDom = "";
        $.each(this.config.data.list,function(index,item){
            itemsDom += '<li><span>'+item.name+'</span><span class="close" index="'+index+'" >X</span> </li>';
        });
        this.$parent.find("ul").html(itemsDom);
        this.$parent.appendTo(this.config.wrapper);
        this._bind();

    },

    _bind : function (){

        var self = this;

        this.$parent.delegate("input#dataAdd","click",function(e){
            new ResourceDialog().show($(e.target) ,self.addResource, self);
        });

        this.$parent.delegate("li .close","click",function(e){
            self.removeResource($(this));
        });

    },

    reorderDomList : function (){
        var itemsDom = "";
        $.each(this.config.data.list,function(index,item){
            itemsDom += '<li><span>'+item.name+'</span><span class="close" index="'+index+'" >X</span> </li>';
        });
        this.$parent.find("ul").html(itemsDom);
    },

    addResource : function( name ){
        this.$parent.find("ul").append('<li><span>'+name+'</span><span class="close">X</span> </li>');
        this.addData2Config(name);
    },

    addData2Config : function (name){
        this.config.data.list.push({"name" : name});
    },

    removeResource : function (dom){
        var domIndex = dom.attr("index");
        this.removeData2ConfigByIndex(domIndex);
        dom.parent().remove();
        this.reorderDomList();
    },

    removeData2ConfigByIndex : function (index){
        this.config.data.list.splice(index,1);
    }

}

function SideBarManager(options){
    this.wrapper = $(".sidebar ul");
    this.data = options.data;
    this.update();
}
SideBarManager.prototype = {
    update : function (){
        var zone1 = 0 , zone2 = 0;
        $.each(data,function(i,v){
            if(v.type == "zone1"){
                zone1 ++;
            }else{
                zone2 ++;
            }
        })
        this.wrapper.html('<li>Zone1  '+zone1+'</li><li>Zone2  '+zone2+'</li>');
    }
};
