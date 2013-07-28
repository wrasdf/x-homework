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
    }
]



function pageController (sideBarManager,zoneManager){
    this.sideBarManager = sideBarManager;
    this.zoneManager = zoneManager;
}

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
        this.setPositionByDom(dom);
        this.callContext = context;
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
        self.saveBtn.bind('click', function() {
            self.save();
        });
        self.cancelBtn.bind('click', function() {
            self.cancel();
        });
        $(window).bind('keydown', function(e) {
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



function ZoneManager (){

}

function ZoneSection (options){

    var config = $.extend({
        type : "servers",
        data : [
            {"name" : "name server"}
        ]
    },options || {});

    this.sectionType = config.type;
    this.list = config.data;
    this._render();
}

ZoneSection.prototype = {

    _render : function(){

        this.$parent = $('<section><h3>Names servers</h3><ul class="list"></ul><input type="button" value="add" /></section>');


    },

    _bind : function (){


    }


}



