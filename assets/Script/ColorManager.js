var GameplayManager = require("GameplayManager");
var Global = require("Global");

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

    onLoad () {
     	Global.ColorManager = this;
    },

    loadPalette (index) {
    	Global.GameplayManager.background.color = this.colorPalettes[index].bgColor;
    	for (i = 0 ; i < Global.GameplayManager.lights.length ; i++)
    	{
    		var chosenColor = Math.floor (Math.random () * this.colorPalettes[index].padColors.length);
    		Global.GameplayManager.lights[i].node.color = this.colorPalettes[index].padColors[chosenColor];
    	}
    },

    loadRandomPalette () {
    	var chosenPalette = Math.floor (Math.random () * this.colorPalettes.length);
    	this.loadPalette (chosenPalette);
    },

    // update (dt) {},
});
