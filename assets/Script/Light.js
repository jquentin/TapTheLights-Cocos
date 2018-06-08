// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
    	
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		this.fire.active = false;
    },
    
    trigger () {
    	cc.audioEngine.play (this.sound);
		this.fireImg.active = true;
		this.scheduleOnce(function() {cc.log("test"); this.fire.active = false; }, 0.5);

    },
    
    
    fire () {
    	cc.log (this.fireImg);
		this.fireImg.active = true;
		//this.scheduleOnce(this.lose, 1);
    },
    
    tap () {
    	if (this.fireImg.active)
    	{
    		cc.audioEngine.play (this.sound);
    		this.fireImg.active = false;
    		//this.unschedule (this.lose);
    	}
    	else
    	{
	    	this.lose ();
    	}

    },
    
    lose () {
    	GameplayManager.instance.lose (this);
    },

    // update (dt) {},
});
