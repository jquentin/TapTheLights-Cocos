var GameplayManager = require("GameplayManager");
var Global = require("Global");

var Instrument = cc.Class({

	name: "Instrument",

    properties: {
    	
    	notes: {
    		default: [],
    		type: [cc.AudioClip],
    	},
    
    }

});

cc.Class({
    extends: cc.Component,

    properties: {
    
    	instruments: {
    		default: [],
    		type: [Instrument],
    	},
    	
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
     	Global.MusicManager = this;
    },

    loadInstrument (index) {
    	for (i = 0 ; i < Global.GameplayManager.lights.length ; i++)
    	{
    		Global.GameplayManager.lights[i].getComponent (cc.AudioSource).clip = this.instruments[index].notes[i];
    	}
    },

    loadRandomInstrument () {
    	var chosenInstrument = Math.floor (Math.random () * this.instruments.length);
    	this.loadInstrument (chosenInstrument);
    },

    // update (dt) {},
});
