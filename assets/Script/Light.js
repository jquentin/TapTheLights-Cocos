var GameplayManager = require("GameplayManager");
var Global = require("Global");

var Light = cc.Class({
    extends: cc.Component,
	
    properties: {
    	
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
	    if (!Global.GameplayManager.dead)
	    {
    		Global.GameplayManager.lose (this);
    		this.shake ();
    	}
    },
    
    reset () {
    	this.fireImg.active = false;
    	this.unschedule (this.lose);
    },
    
    shake () {
    	var time = 0.1;
    	this.node.runAction (cc.sequence (
    		cc.scaleTo (time * 0.4, 1.1).easing (cc.easeSineOut ()),
    		cc.scaleTo (time, 0.95).easing (cc.easeSineInOut ()),
    		cc.scaleTo (time, 1.05).easing (cc.easeSineInOut ()),
    		cc.scaleTo (time, 1).easing (cc.easeSineInOut ())));
    },

    // update (dt) {},
});
