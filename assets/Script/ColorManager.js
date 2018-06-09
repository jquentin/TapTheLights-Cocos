var ColorPalette = cc.Class({

	name: "ColorPalette",

    properties: {
    	
    	bgColor: {
    		default: cc.Color.BLACK,
    		type: cc.Color,
    	},
    	
    	padColors: {
    		default: [],
    		type: [cc.Color],
    	},
    
    }

});

cc.Class({
    extends: cc.Component,

    properties: {
    	
    	colorPalettes: {
    		default: [],
    		type: [ColorPalette],
    	},
    
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
