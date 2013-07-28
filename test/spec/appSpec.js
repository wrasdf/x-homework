describe("Zone Section",function(){

    var data, zoneSection;

    beforeEach(function(){

        data = [
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
            }
        ];
        zoneSection = new ZoneSection({data:data[1]["sections"][1]});

    });

    afterEach(function(){
        $('section').remove();
    });

    it("should return correct dom and data when user click close button" , function(){
        $('section').find('.close').eq(0).click();
        expect($('section').find("ul li").length).toBe(1);
        expect(data[1]["sections"][1].list.length).toBe(1);

        $('section').find('.close').eq(0).click();
        expect($('section').find("ul li").length).toBe(0);
        expect(data[1]["sections"][1].list.length).toBe(0);

    });

    it("should return correct dom and data when user add resource", function(){
        zoneSection.addResource("t");
        expect($('section').find("ul li").length).toBe(3);
        expect(data[1]["sections"][1].list.length).toBe(3);
        expect(data[1]["sections"][1].list[2]).toEqual({name:"t"});
    });

});
