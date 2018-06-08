// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var instance = null;

cc.Class({
    extends: cc.Component,

    properties: {
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
         lights: {
            default: [],
            type: [cc.Node],
       },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    	if (instance == null)
			instance = this;
     	
		this.schedule (this.fireOne, 1);
    },

	fireOne () {
		var lightIndex = Math.floor (Math.random() * 9);
		cc.log (lightIndex);
		var lightNode = this.lights[lightIndex];
		var light = lightNode.getComponent("Light");
		light.fire ();
	},
	
	lose () {
		alert ("Loser");
	},
	
     update (dt) {
     	
     
     },
});
