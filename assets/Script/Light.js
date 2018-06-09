var GameplayManager = require("GameplayManager");
var Global = require("Global");

var Light = cc.Class({
    extends: cc.Component,
	
    properties: {
    	sound: 
    	{
    		default: null,
    		type: cc.AudioClip
    	},
    	
    	fireImg:
    	{
			default: null,
    		type: cc.Node
    	}
    	
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		this.fire.active = false;
    },
    
    
    fire () {
    	//cc.log (this.fireImg);
		this.fireImg.active = true;
		this.scheduleOnce(this.lose, 1);
    },
    
    tap () {
    	if (this.fireImg.active)
    	{
    		this.getComponent (cc.AudioSource).play ();
    		this.fireImg.active = false;
    		this.unschedule (this.lose);
    		Global.GameplayManager.increaseScore ();
    	}
    	else
    	{
	    	this.lose ();
    	}

    },
    
    lose () {
    	Global.GameplayManager.lose (this);
    },

    // update (dt) {},
});
